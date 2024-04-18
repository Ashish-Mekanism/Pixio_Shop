import express from "express";
import { getAllProducts } from "../controllers/Product_Controllers/getAllProducts.js";
import { getCustomProduct } from "../controllers/Product_Controllers/getCustomProduct.js";
import { getAllProductsByCategory } from "../controllers/Product_Controllers/getAllProductsByCategory.js";
import { getAllProductsByPrice } from "../controllers/Product_Controllers/getProductByPrice.js";

const productRouter = express.Router();

productRouter.get("/title/:title", getCustomProduct);
productRouter.get("/category/:category?", getAllProductsByCategory);
productRouter.get("/:price", getAllProductsByPrice);
productRouter.get("/", getAllProducts);

export default productRouter;
