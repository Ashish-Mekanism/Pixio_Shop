import Cart from "../../models/cartModel.js";

export const listing_cart_product = async (req, res) => {
  const userId = req.user.id;
  try {
    const cartProducts = await Cart.find({ userId: userId }).populate(
      "productId"
    );
    // console.log(cartProducts);

    if (cartProducts.length > 0) {
      const productsWithQuantity = cartProducts.map((product) => ({
        details: product.productId,
        product_quantity: product.product_quantity,
      }));

      return res.status(200).json(productsWithQuantity);
    } else {
      return res.status(404).send("No products found in the cart.");
    }
  } catch (error) {
    console.error("Error fetching cart products:", error);
    return res.status(500).send("Internal Server Error");
  }
};
