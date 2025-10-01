import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
}
export default connectDb;