import express from "express";
import { authMiddleware } from "../middlewares/authMiddlewares.js";
import { add_to_cart } from "../controllers/Cart_Controllers/cart.js";

const cartRouter = express.Router();

cartRouter.post("/add-to-cart", authMiddleware, add_to_cart);

export default cartRouter;
