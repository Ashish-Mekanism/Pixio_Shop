import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectDB } from "./V1/db/index.js";
import userRouter from "./V1/routes/userRouter.js";
import productRouter from "./V1/routes/productRouter.js";
import cartRouter from "./V1/routes/cartRouter.js";
import wishlistRouter from "./V1/routes/wishlistRouter.js";
import orderRouter from "./V1/routes/orderRouter.js";
import reviewsRouter from "./V1/routes/reviewsRouter.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT;

connectDB()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("monodb connection error: " + err);
  });

app.get("/api/check", (req, res) => {
  res.send("Working");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/reviews", reviewsRouter);

app.listen(port, "192.168.1.30", () => {
  console.log(`app listening on port ${port}`);
});
