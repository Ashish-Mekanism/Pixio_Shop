import mongoose from "mongoose";
import User from "../models/userModel.js";
import Product from "./productModel.js";
const { Schema } = mongoose;

const OrderSchema = new Schema({
  items: [
    {
      product_quantity: { type: Number },
      product_discount: { type: Number },
      product_price: { type: Number },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Product,
        required: true,
      },
      subtotal: { type: Number },
    },
  ],
  total: { type: Number },

  user: { type: Schema.Types.ObjectId, ref: User },
});

const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;
