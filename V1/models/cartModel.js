import mongoose from "mongoose";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";

const { Schema } = mongoose;

const CartSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Product,
    required: true,
  },
  product_quantity: {
    type: Number,
  },
});

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
