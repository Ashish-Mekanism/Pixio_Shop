import Order from "../../models/orderModel.js";
import Product from "../../models/productModel.js";

export const add_to_order = async (req, res) => {
  const { product_id, product_quantity } = req.body;
  const userId = req.user.id;

  try {
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const subtotal = product.price * product_quantity;
    const total = subtotal - product.discount;

    // new order item
    const newOrderItem = {
      product_quantity,
      product_discount: product.discount,
      product_price: product.price,
      productId: product_id,
      subtotal,
    };

    // Find  order or create a new one
    let order = await Order.findOne({ user: userId });
    if (!order) {
      order = await Order.create({
        user: userId,
        items: [newOrderItem],
        total,
      });
    } else {
      order.items.push(newOrderItem);
      order.total += total;
      await order.save();
    }

    return res.status(201).json(order);
  } catch (error) {
    console.error("Error adding product to order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
