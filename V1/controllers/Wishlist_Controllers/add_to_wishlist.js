import Wishlist from "../../models/wishlistModel.js";

export const add_to_wishlist = async (req, res) => {
  const { product_id } = req.body;
  const userId = req.user.id;

  try {
    const existingProduct = await Wishlist.findOne({
      productId: product_id,
      userId,
    });
    // Wishlist already exists
    if (existingProduct) {
      await existingProduct.save();
      return res.status(200).send("Wishlist already exists");
    } else {
      const newWishlist = await Wishlist.create({
        userId,
        productId: product_id,
      });
      await newWishlist.save();
      return res.status(201).json(newWishlist);
    }
  } catch (error) {
    res.status(500).send("Can't Add Product to Wishlist ");
  }
};
