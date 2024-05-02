import Cart from "../../models/cartModel.js";

// to remove the product from the cart

export const remove_from_cart = async (req, res) => {
  const { product_id } = req.body;
  const userId = req.user.id;

  try {
    await Cart.findOneAndDelete({
      productId: product_id,
      userId,
    });
    res.status(200).send("Product Removed");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
