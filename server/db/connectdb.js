import mongoose from "mongoose";

let isConnected = false;

const connectDb = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  isConnected = true;
};

await connectDb();
