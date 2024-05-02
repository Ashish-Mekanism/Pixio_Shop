import express from "express";
import { authMiddleware } from "../middlewares/authMiddlewares.js";
import { add_order } from "../controllers/Order_Controllers/add_order.js";
import { get_all_order_items } from "../controllers/Order_Controllers/get_all_order_items.js";
import { get_single_order_item } from "../controllers/Order_Controllers/get_single_order_item.js";

const orderRouter = express.Router();

orderRouter.post("/add-order", authMiddleware, add_order);
orderRouter.get("/get-all-order", authMiddleware, get_all_order_items);
orderRouter.get("/get-single-order", authMiddleware, get_single_order_item);

export default orderRouter;
