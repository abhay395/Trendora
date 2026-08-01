import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import GoogleStrategy from 'passport-google-oauth20';
import rateLimit from 'express-rate-limit';

import User from './models/User.model.js';
import router from './routes/index.routes.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

dotenv.config();

const app = express();

// Trust proxy for Vercel/load balancers
app.set('trust proxy', 1);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://trendora-i8b9.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const cleanedOrigin = origin.replace(/\/$/, "");
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

// Express Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_session_secret', // Should be in env
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL,
    collectionName: 'sessions',
    ttl: 24 * 60 * 60,
    touchAfter: 24 * 60 * 60,
    autoRemove: 'native',
    autoRemoveInterval: 60,
  }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000,
    domain: process.env.NODE_ENV === 'production' ? '.vercel.app' : undefined
  }
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
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
      try {
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
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Standard Middleware
app.use(limiter);
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("Trendora API is running"));
app.use('/api/v1', router);

// Error Handling
app.use(errorHandlerMiddleware);

export default app;
