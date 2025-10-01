import express from 'express';
import dotenv from 'dotenv';
import errorHandlerMiddleware from './middleware/error-handler.js';
import cors from 'cors';
import router from './routes/index.routes.js';
import rateLimit from "express-rate-limit";
import session from 'express-session';
import passport from 'passport';
import connectDb from  './db/connectdb.js'
import GoogleStrategy from 'passport-google-oauth20'
import User from './models/User.model.js';
import MongoStore from 'connect-mongo';
dotenv.config();

const app = express();


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL, // your existing MongoDB
    collectionName: 'sessions',
    ttl: 24 * 60 * 60, // 1 day
    touchAfter: 24 * 60 * 60, // lazy session update (24 hours)
    autoRemove: 'native',
    autoRemoveInterval: 60, // check for expired sessions every 60 minutes
  }),
  cookie: {
    httpOnly: true,
    secure: false, // only secure in production
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    // domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : undefined
  }
}));
app.use(passport.initialize());
app.use(passport.session());



passport.serializeUser((user, done) => {
  done(null, user._id); // store only user ID in session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // fetch full user from DB
    // console.log(user)
    done(null, user); // now req.user will be full user object
  } catch (err) {
    done(err);
  }
});

passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { displayName, emails, photos } = profile;
      let user = await User.findOne({ email: emails[0].value });

      if (!user) {
        user = new User({
          name: displayName,
          email: emails[0].value,
          image: photos[0].value,
          isActive: true
        });
        await user.save();
      }

      return done(null, user); // Pass full user object here
    }
  )
);


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: "Too many requests from this IP, please try again later.",
})

const allowedOrigins = [
  "http://localhost:5174",
  "https://trendora-i8b9.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow server-to-server or curl
    const cleanedOrigin = origin.replace(/\/$/, ""); // remove trailing slash
    if (allowedOrigins.includes(cleanedOrigin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS Not Allowed: " + origin));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(limiter)
app.use(express.json());


app.get("/api/v1/debug", (req, res) => {
  res.json({
    cookies: req.headers.cookie,
    session: req.session,
    user: req.user,
  });
});
app.get("/", (req, res) => res.send("Hello world"));
app.use('/api/v1', router);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server Is Running on Port ${PORT}`)
})
connectDb()