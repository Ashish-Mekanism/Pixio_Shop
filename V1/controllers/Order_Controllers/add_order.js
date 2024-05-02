import Order from "../../models/orderModel.js";
import Product from "../../models/productModel.js";

export const add_order = async (req, res) => {
  const { product_id, product_quantity } = req.body;
  const userId = req.user.id;

  try {
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const subtotal = Math.round(
      product.price * product_quantity * (1 - product.discount / 100)
    );
    const total = Math.round(subtotal);

    let order = await Order.findOne({ user: userId });

    if (!order) {
      order = await Order.create({
        user: userId,
        items: [],
        total: 0,
      });
    }

    //if the product already exists in the order items
    const existingOrderItem = order.items.find(
      (item) => item.productId.toString() === product_id
    );

    if (existingOrderItem) {
      existingOrderItem.product_quantity += product_quantity;
      existingOrderItem.subtotal += subtotal;
    } else {
      order.items.push({
        product_quantity,
        product_discount: product.discount,
        product_price: product.price,
        productId: product_id,
        subtotal,
      });
    }

    order.total += total;

    await order.save();

    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
