import express from 'express';
import dotenv from 'dotenv';
import errorHandlerMiddleware from '../middleware/error-handler.js';
import cors from 'cors';
import connectDb from '../db/connectdb.js';
import router from '../routes/index.routes.js';
import serverless from 'serverless-http';

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://trendora-i8b9.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error("CORS Not Allowed"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

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