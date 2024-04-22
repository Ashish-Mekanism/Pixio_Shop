import express from "express";
import { authMiddleware } from "../middlewares/authMiddlewares.js";
import { add_to_order } from "../controllers/Order_Controllers/add_to_order.js";
import { get_order_items } from "../controllers/Order_Controllers/get_order_items.js";
import { get_single_order } from "../controllers/Order_Controllers/get_single_order.js";

const orderRouter = express.Router();

orderRouter.post("/add-to-order", authMiddleware, add_to_order);
orderRouter.get("/get-order-items", authMiddleware, get_order_items);
orderRouter.get("/get-single-order", authMiddleware, get_single_order);

export default orderRouter;
