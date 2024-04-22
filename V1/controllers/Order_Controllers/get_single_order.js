// import Order from "../../models/orderModel.js";

// export const get_single_order = async (req, res) => {
//   const { product_id } = req.body;
//   const userId = req.user.id;

//   try {
//     const orderProduct = await Order.findOne({
//       "items.productId": product_id,
//       user: userId,
//     }).populate({
//       path: "items.productId",
//       select: "images category",
//     });

//     if (orderProduct) {
//       const allOrderItems = orderProduct.items.map((item) => ({
//         productId: item.productId._id,
//         images: item.productId.images,
//         quantity: item.product_quantity,
//         category: item.productId.category,
//       }));

//       return res.status(200).json(allOrderItems);
//     } else {
//       return res.status(404).send("No Order Found.");
//     }
//   } catch (error) {
//     console.error("Error fetching order:", error);
//     return res.status(500).send("Internal Server Error");
//   }
// };
import Order from "../../models/orderModel.js";

export const get_single_order = async (req, res) => {
  const { product_id } = req.body;
  const userId = req.user.id;

  try {
    const orderProduct = await Order.findOne({
      "items.productId": product_id,
      user: userId,
    }).populate({
      path: "items.productId",
      select: "images category",
    });

    if (orderProduct) {
      const matchedItem = orderProduct.items.find(
        (item) => item.productId === product_id
      );
      console.log(matchedItem);

      if (matchedItem) {
        const orderItem = {
          productId: matchedItem.productId._id,
          images: matchedItem.productId.images,
          quantity: matchedItem.product_quantity,
          category: matchedItem.productId.category,
        };
        return res.status(200).json(orderItem);
      } else {
        return res.status(404).send("Product not found in order.");
      }
    } else {
      return res.status(404).send("No Order Found.");
    }
  } catch (error) {
    console.error("Error fetching order:", error);
    return res.status(500).send("Internal Server Error");
  }
};
