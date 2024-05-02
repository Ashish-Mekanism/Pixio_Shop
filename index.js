import express from "express";
import userRouter from "./V1/routes/userRouter.js";
import productRouter from "./V1/routes/productRouter.js";
import cartRouter from "./V1/routes/cartRouter.js";
import wishlistRouter from "./V1/routes/wishlistRouter.js";
import orderRouter from "./V1/routes/orderRouter.js";
import cors from "cors";
import { connectDB } from "./V1/db/index.js";
import reviewsRouter from "./V1/routes/reviewsRouter.js";

const app = express();
app.use(express.json());
app.use(cors());

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

app.use("/v1/user", userRouter);
app.use("/v1/product", productRouter);
app.use("/v1/cart", cartRouter);
app.use("/v1/wishlist", wishlistRouter);
app.use("/v1/order", orderRouter);
app.use("/v1/reviews", reviewsRouter);

app.listen(8080, () => {
  console.log("app listening on port 8080");
});
