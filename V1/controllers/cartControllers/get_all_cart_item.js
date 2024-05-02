import Cart from "../../models/cartModel.js";

// to get a list of all the items in the cart

export const get_all_cart_item = async (req, res) => {
  const userId = req.user.id;
  try {
    const cartProducts = await Cart.find({ userId: userId }).populate(
      "productId"
    );

    return res.status(200).json(cartProducts);
  } catch (error) {
    console.error("Error fetching cart products:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
