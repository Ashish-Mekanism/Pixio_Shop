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
      return res.status(200).json({ message: "Wishlist already exists" });
    } else {
      const newWishlist = await Wishlist.create({
        userId,
        productId: product_id,
      });

      return res.status(201).json(newWishlist);
    }
  } catch (error) {
    res.status(500).json({ error: "Can't Add Product to Wishlist " });
  }
};
