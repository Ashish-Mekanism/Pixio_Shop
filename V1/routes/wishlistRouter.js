import express from "express";
import { authMiddleware } from "../middlewares/authMiddlewares.js";
import { add_to_wishlist } from "../controllers/Wishlist_Controllers/add_to_wishlist.js";
import { remove_from_wishlist } from "../controllers/Wishlist_Controllers/remove_from_wishlist.js";
import { listing_all_wishlist } from "../controllers/Wishlist_Controllers/listing_all_wishlist.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/add-to-wishlist", authMiddleware, add_to_wishlist);
wishlistRouter.get(
  "/listing-all-wishlist",
  authMiddleware,
  listing_all_wishlist
);
wishlistRouter.delete(
  "/remove-from-wishlist",
  authMiddleware,
  remove_from_wishlist
);

export default wishlistRouter;
