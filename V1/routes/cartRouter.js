import express from "express";
import { authMiddleware } from "../middlewares/authMiddlewares.js";
import { get_all_cart_item } from "../controllers/cartControllers/get_all_cart_item.js";
import { remove_from_cart } from "../controllers/cartControllers/remove_cart_item.js";
import { modify_cart } from "../controllers/cartControllers/modify_cart.js";
import { add_to_cart } from "../controllers/cartControllers/Add_to_cart.js";

const cartRouter = express.Router();

cartRouter.post("/add-to-cart", authMiddleware, add_to_cart);
cartRouter.delete("/remove-from-cart", authMiddleware, remove_from_cart);
// cartRouter.post("/add-one-item", authMiddleware, add_one_item);
// cartRouter.delete("/remove-one-item", authMiddleware, remove_one_item);
cartRouter.post("/modify-cart", authMiddleware, modify_cart);
cartRouter.get("/get-all-cart-items", authMiddleware, get_all_cart_item);

export default cartRouter;
