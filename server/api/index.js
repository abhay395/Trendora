import express from 'express';
import dotenv from 'dotenv';
import errorHandlerMiddleware from '../middleware/error-handler.js';
import cors from 'cors';
import connectDb from '../db/connectdb.js';
import router from '../routes/index.routes.js';
import serverless from 'serverless-http';

dotenv.config();

const app = express();

// ✅ Correct CORS setup
app.use(cors({
  origin: "http://localhost:5173", // No trailing slash
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