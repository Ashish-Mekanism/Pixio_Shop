import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  images: [{ type: String }],
  description: { type: String, required: true },
  discount: { type: Number },
  rating: {
    rate: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  category: { type: String, required: true },
  seller: { type: Schema.Types.ObjectId, ref: "User" },
});

const ProductModel = mongoose.model("Product", ProductSchema);

export default ProductModel;
