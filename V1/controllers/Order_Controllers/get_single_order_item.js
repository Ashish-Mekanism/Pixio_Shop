import Order from "../../models/orderModel.js";

export const get_single_order_item = async (req, res) => {
  const userId = req.user.id;
  const { product_id } = req.body;
  try {
    const order_items = await Order.find({ user: userId }).populate({
      path: "items.productId",
      select: "images title price category discount subtotal",
    });

    if (order_items.length > 0) {
      const allOrderItems = order_items.map((order) => ({
        items: order.items
          .filter((item) => item.productId._id.toString() === product_id)
          .map((item) => ({
            quantity: item.product_quantity,
            productId: item.productId._id,
            images: item.productId.images[0],
            title: item.productId.title,
            category: item.productId.category,
            discount: item.productId.discount,
            price: item.productId.price,
            discounted_price: Math.round(item.subtotal),
          })),
      }));

      return res.status(200).json(allOrderItems);
    } else {
      return res.status(500).json({ error: "No Order Found." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
