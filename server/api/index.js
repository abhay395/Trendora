import express from 'express';
import dotenv from 'dotenv';
import errorHandlerMiddleware from '../middleware/error-handler.js';
import cors from 'cors';
import connectDb from '../db/connectdb.js';
import router from '../routes/index.routes.js';
import serverless from 'serverless-http';
import rateLimit from "express-rate-limit";
import session from 'express-session';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20'
import User from '../models/User.model.js';
import MongoStore from 'connect-mongo';
dotenv.config();

const app = express();
app.set('trust proxy', 1);

connectDb()

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
    secure: true, // only secure in production
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : undefined
  }
}));
app.use(passport.initialize());
app.use(passport.session());



passport.serializeUser((user, done) => {
  done(null, user._id); // store only user ID in session
});

passport.deserializeUser(async (id, done) => {
  console.log("DESERIALIZE CALLED WITH:", id);
  try {
    const user = await User.findById(id);
    console.log("USER FOUND:", user);
    done(null, user);
  } catch (err) {
    console.error("DESERIALIZE ERROR:", err);
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



const allowedOrigins = [
  "http://localhost:5173",
  "https://trendora-i8b9.vercel.app"
];
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
})
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
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  credentials: true
}));

app.use(limiter)
app.use(express.json());
app.use((req, res, next) => {
  console.log("Cookies received:", req.headers.cookie);
  next();
});
app.get("/api/v1/debug", (req, res) => {
  res.json({
    cookie: req.cookies,
    session: req.session,
    passport: req.session?.passport,
    user: req.user,
  });
});

app.get("/", (req, res) => res.send("Hello world"));

app.use('/api/v1', router);

app.use(errorHandlerMiddleware);

export default app;

// export const handler = serverless(app);