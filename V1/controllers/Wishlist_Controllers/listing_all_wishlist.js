import Wishlist from "../../models/wishlistModel.js";

export const listing_all_wishlist = async (req, res) => {
  const userId = req.user.id;
  try {
    const wishlistProducts = await Wishlist.find({ userId: userId }).populate(
      "productId"
    );

    if (wishlistProducts.length > 0) {
      const productOfWishlist = wishlistProducts.map((product) => ({
        details: product.productId,
      }));

      return res.status(200).json(productOfWishlist);
    } else {
      return res.status(404).send("No products found in the wishlist.");
    }
  } catch (error) {
    console.error("Error fetching cart products:", error);
    return res.status(500).send("Internal Server Error");
  }
};
