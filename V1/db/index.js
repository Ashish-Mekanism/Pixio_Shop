import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Pixo-Shop");
  } catch (error) {
    console.error(error);
  }
};
