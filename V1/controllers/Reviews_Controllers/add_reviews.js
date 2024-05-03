// import ReviewModel from "../../models/reviewModel.js";
// import OrderModel from "../../models/orderModel.js";

// export const add_reviews = async (req, res) => {
//   const userId = req.user.id;
//   const { product_id, review, rating } = req.body;

//   try {
//     const hasBought = await OrderModel.findOne({
//       user: userId,
//       "items.productId": product_id,
//     });

//     if (!hasBought) {
//       res
//         .status(403)
//         .json({ error: "You can only review products you have bought" });
//       return;
//     }

//     const existingReviews = await ReviewModel.findOne({
//       productId: product_id,
//       userId: userId,
//     });

//     if (existingReviews) {
//       res.status(403).json({ error: "You already reviewed this product" });
//     } else {
//       const newReview = new ReviewModel({
//         rating: rating,
//         review: review,
//         productId: product_id,
//         userId: userId,
//       });
//       await newReview.save();
//       res.status(200).json({ message: "Review added successfully" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

import ReviewModel from "../../models/reviewModel.js";
import OrderModel from "../../models/orderModel.js";

export const add_reviews = async (req, res) => {
  const userId = req.user.id;
  const { product_id, review, rating } = req.body;

  try {
    const hasBought = await OrderModel.findOne({
      user: userId,
      "items.productId": { $in: [product_id] },
    });

    if (!hasBought) {
      res
        .status(403)
        .json({ error: "You can only review products you have bought" });
      return;
    }

    const existingReviews = await ReviewModel.findOne({
      productId: product_id,
      userId: userId,
    });

    if (existingReviews) {
      res.status(403).json({ error: "You already reviewed this product" });
    } else {
      const newReview = new ReviewModel({
        rating: rating,
        review: review,
        productId: product_id,
        userId: userId,
      });
      await newReview.save();
      res.status(200).json({ message: "Review added successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
