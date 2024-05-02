import Cart from "../../models/cartModel.js";

// add product into cart

export const add_to_cart = async (req, res) => {
  const { product_id } = req.body;
  const userId = req.user.id;

  try {
    const existingItem = await Cart.findOne({ productId: product_id, userId });
    if (existingItem) {
      existingItem.product_quantity += 1;
      await existingItem.save();
      return res.status(200).json(existingItem);
    }
    // cart doesn't exist
    else {
      const newCart = await Cart.create({
        userId,
        productId: product_id,
        product_quantity: 1,
      });

      return res.status(201).json(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Can't Add Product to Cart" });
  }
};
