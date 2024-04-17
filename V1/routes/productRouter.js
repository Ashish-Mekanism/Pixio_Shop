import express from "express";
import { getAllProducts } from "../controllers/getAllProducts.js";
import { getCustomProduct } from "../controllers/getCustomProduct.js";
import { getAllProductsByCategory } from "../controllers/getAllProductsByCategory.js";
import { getAllProductsByPrice } from "../controllers/getProductByPrice.js";

const productRouter = express.Router();

productRouter.get("/title/:title", getCustomProduct);
productRouter.get("/category/:category?", getAllProductsByCategory);
productRouter.get("/:price", getAllProductsByPrice);
productRouter.get("/", getAllProducts);

export default productRouter;
