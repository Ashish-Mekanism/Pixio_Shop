import mongoose from "mongoose";
const { Schema } = mongoose;

const reviewSchema = new Schema({
  rating: { type: Number },
  review: { type: String },
  productId: { type: Schema.Types.ObjectId, ref: "Product" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const ReviewModel = mongoose.model("Review", reviewSchema);
export default ReviewModel;
