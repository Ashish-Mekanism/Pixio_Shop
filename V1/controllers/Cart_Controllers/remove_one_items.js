import Cart from "../../models/cartModel.js";

export const remove_one_item = async (req, res) => {
  const { product_id } = req.body;
  const userId = req.user.id;

  try {
    // Find the cart item with the specified product with the specified product ID
    const cartItem = await Cart.findOne({
      productId: product_id,
      userId,
    });

    if (cartItem.product_quantity) {
      cartItem.product_quantity -= 1;
      await cartItem.save();
      return res.status(200).json(cartItem);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
