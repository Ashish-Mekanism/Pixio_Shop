import express from "express";
import { getAllProducts } from "../controllers/getAllProducts.js";
import { getAllProductsByCategory } from "../controllers/getAllProductsByCategory.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/category/:category?", getAllProductsByCategory);

export default productRouter;
