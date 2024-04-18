import mongoose from "mongoose";
const { Schema } = mongoose;
const CartSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  product_quantity: { type: Number },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});
const CartModel = mongoose.model("Cart", CartSchema);
export default CartModel;
