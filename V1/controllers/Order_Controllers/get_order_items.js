// import Order from "../../models/orderModel.js";

// export const get_order_items = async (req, res) => {
//   const userId = req.user.id;
//   try {
//     const orderProducts = await Order.find({ user: userId }).populate(
//       "items.productId"
//     );

//     if (orderProducts.length > 0) {
//       return res.status(200).json(orderProducts);
//     } else {
//       return res.status(404).send("No Order Found.");
//     }
//   } catch (error) {
//     console.error("Error fetching order:", error);
//     return res.status(500).send("Internal Server Error");
//   }
// };

import Order from "../../models/orderModel.js";

export const get_order_items = async (req, res) => {
  const userId = req.user.id;
  try {
    const orderProducts = await Order.find({ user: userId }).populate({
      path: "items.productId",
      select: "title images description category",
    });

    if (orderProducts.length > 0) {
      const allOrderItems = orderProducts.map((order) => ({
        details: orderProducts,
        // orderId: order._id,
        items: order.items.map((item) => ({
          productId: item.productId._id,
          title: item.productId.title,
          images: item.productId.images,
          description: item.productId.description,
          category: item.productId.category,
        })),
      }));

      return res.status(200).json(allOrderItems);
    } else {
      return res.status(404).send("No Order Found.");
    }
  } catch (error) {
    console.error("Error fetching order:", error);
    return res.status(500).send("Internal Server Error");
  }
};
