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
dotenv.config();

const app = express();


app.use(session({ secret: "SECRET", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});
passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log(profile, profile?.displayName)
      // const user = new User({ name: profile.displayName, email: profile.emails[0].value, image: [profile.photos[0].value] })
      // await user.save()
      return done(null, profile);
    }
  )
);


const allowedOrigins = [
  "http://localhost:5173",
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


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
})
app.use(limiter)
app.use(express.json());

app.use(async (req, res, next) => {
  await connectDb();
  next();
});

app.get("/", (req, res) => res.send("Hello world"));

app.use('/api/v1', router);

app.use(errorHandlerMiddleware);

export default app;
export const handler = serverless(app);