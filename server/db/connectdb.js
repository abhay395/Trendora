// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();
// async function connectDb() {
//   try {
//     await mongoose.connect(process.env.MONGODB_URL, {
//       connectTimeoutMS: 30000,
//       socketTimeoutMS: 45000,
//     });
//     console.log("MongoDB connected");
//   } catch (error) {
//     console.log(error);
//   }
// }
// export default connectDb;
import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = process.env.MONGODB_URL;
    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
    }).then(m => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
