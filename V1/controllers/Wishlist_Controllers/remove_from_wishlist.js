import Wishlist from "../../models/wishlistModel.js";

export const remove_from_wishlist = async (req, res) => {
  const { product_id } = req.body;
  try {
    const wishlistItem = await Wishlist.findOne({ productId: product_id });

    if (!wishlistItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    } else {
      //  remove the entire item from the Wishlist
      await Wishlist.findOneAndDelete({ productId: product_id });
      return res.status(200).json({ message: "Product removed from Wishlist" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
