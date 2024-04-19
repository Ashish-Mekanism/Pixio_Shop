import express from "express";
import { authMiddleware } from "../middlewares/authMiddlewares.js";
import { add_to_cart } from "../controllers/Cart_Controllers/cart.js";
import { remove_from_cart } from "../controllers/Cart_Controllers/remove.js";
import { listing_cart_product } from "../controllers/Cart_Controllers/listing.js";

const cartRouter = express.Router();

cartRouter.post("/add-to-cart", authMiddleware, add_to_cart);
cartRouter.delete("/remove-from-cart", authMiddleware, remove_from_cart);
cartRouter.get("/listing-cart-product", authMiddleware, listing_cart_product);

export default cartRouter;
