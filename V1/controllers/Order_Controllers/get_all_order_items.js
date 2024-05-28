import Order from "../../models/orderModel.js";

export const get_all_order_items = async (req, res) => {
  const userId = req.user.id;

  try {
    const order_items = await Order.find({ user: userId }).populate({
      path: "items.productId",
      select: " images title price subtotal  ",
    });

    if (order_items.length > 0) {
      const allOrderItems = order_items.map((order) => ({
        items: order.items.map((item) => ({
          quantity: item.product_quantity,
          productId: item.productId._id,
          images: item.productId.images[0],
          title: item.productId.title,
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
