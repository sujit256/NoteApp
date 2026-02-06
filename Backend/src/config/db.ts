import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    console.log("Mongo already Connected");
    return;
  }

  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) throw new Error("MONGO_URL not found in .env");

    await mongoose.connect(mongoUrl);
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("mongoDB connection error", error);
    process.exit(1);
  }
};
