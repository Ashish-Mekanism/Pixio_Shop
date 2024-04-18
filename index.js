import express from "express";
import userRouter from "./V1/routes/userRouter.js";
import productRouter from "./V1/routes/productRouter.js";
import mongoose from "mongoose";
import cartRouter from "./V1/routes/cartRouter.js";

const app = express();
app.use(express.json());

app.get("/api/check", (req, res) => {
  res.send("Working");
});

app.use("/v1/user", userRouter);
app.use("/v1/product", productRouter);
app.use("/v1/cart", cartRouter);

mongoose
  .connect("mongodb://localhost:27017/Pixo-Shop")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(8080, () => {
  console.log("app listening on port 8080");
});
