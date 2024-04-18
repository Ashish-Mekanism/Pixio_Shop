import fs from "fs";
import mongoose from "mongoose";
import ProductModel from "../models/productModel.js";

const productData = JSON.parse(fs.readFileSync("./data.json", "utf-8"));

mongoose
  .connect("mongodb://localhost:27017/Pixo-Shop")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

productData.forEach(async (user) => {
  try {
    await ProductModel.create(user);

    // console.log("product inserted into MongoDB");
  } catch (error) {
    console.error(error);
  }
});
