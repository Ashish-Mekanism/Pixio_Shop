import express from "express";
import { authMiddleware } from "../middlewares/authMiddlewares.js";
import { add_reviews } from "../controllers/Reviews_Controllers/add_reviews.js";

const reviewsRouter = express.Router();

reviewsRouter.post("/add-reviews", authMiddleware, add_reviews);

export default reviewsRouter;
