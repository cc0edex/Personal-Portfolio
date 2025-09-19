require("dotenv").config();
import mongoose from "mongoose";
const uri = process.env.MONGODB_URI;
export const ConnectDb = async () => {
  try {
    await mongoose.connect(uri as string);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection failed:", error);
  }
};
