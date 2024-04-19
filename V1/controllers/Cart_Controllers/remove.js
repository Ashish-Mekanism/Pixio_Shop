import Cart from "../../models/cartModel.js";

export const remove_from_cart = async (req, res) => {
  const { product_id } = req.body;

  try {
    // Find the cart item with the specified product with the specified product ID
    const cartItem = await Cart.findOne({ productId: product_id });
    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (cartItem.product_quantity > 1) {
      cartItem.product_quantity -= 1;
      await cartItem.save();
      return res.status(200).json(cartItem);
    } else {
      //  remove the entire item from the cart
      await Cart.findOneAndDelete({ productId: product_id });
      return res.status(200).json({ message: "1 Product removed from cart" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
