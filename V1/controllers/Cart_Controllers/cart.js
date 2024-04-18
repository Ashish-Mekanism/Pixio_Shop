import Cart from "../../models/cartModel.js";

export const add_to_cart = async (req, res) => {
  const { product_id } = req.body;
  const userId = req.user.id;

  try {
    const isExsist = await Cart.findOne({ productId: product_id, userId });

    if (isExsist) {
      // cart already exists
      isExsist.product_quantity += 1;
      isExsist.save();
    } else {
      // doesnt exist
      const newCart = await Cart.create({
        userId,
        productId: product_id,
        product_quantity: 1,
      });
    }
    //  create new cart
    return res.status(201).json(isExsist);
  } catch (err) {
    console.log(err);
    res.status(500).send("Can't Add Product to Cart");
  }
};
