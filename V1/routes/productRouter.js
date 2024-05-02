import express from "express";
import { getAllProducts } from "../controllers/Product_Controllers/getAllProducts.js";

import { getAllCategories } from "../controllers/Product_Controllers/get_All_Products_Category.js";

const productRouter = express.Router();

productRouter.get("/category", getAllCategories);

productRouter.post("/:category?/:product_name?", getAllProducts);

export default productRouter;

// product/T-shirts/Pure Cotton?minPrice=200&maxPrice=500&page=1&per_page=2
