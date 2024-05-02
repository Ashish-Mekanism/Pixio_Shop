// product id
// new quantity

import Cart from "../../models/cartModel.js";

export const modify_cart = async (req, res) => {
  const { product_id, quantity } = req.body;
  const userId = req.user.id;

  try {
    let cartItem = await Cart.findOne({
      productId: product_id,
      userId,
    });

    // If the item is already in the cart, update its quantity
    cartItem.product_quantity = quantity;

    await cartItem.save();
    return res.status(200).json(cartItem);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// //remove one item from  cart

// export const remove_one_item = async (req, res) => {
//   const { product_id } = req.body;
//   const userId = req.user.id;

//   try {
//     // Find the cart item with the specified product with the  product ID
//     const cartItem = await Cart.findOne({
//       productId: product_id,
//       userId,
//     });

//     if (cartItem.product_quantity) {
//       cartItem.product_quantity -= 1;
//       await cartItem.save();
//       return res.status(200).json(cartItem);
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// //add one item to cart

// export const add_one_item = async (req, res) => {
//   const { product_id } = req.body;
//   const userId = req.user.id;

//   try {
//     const cartItem = await Cart.findOne({
//       productId: product_id,
//       userId,
//     });

//     if (cartItem) {
//       cartItem.product_quantity += 1;
//       await cartItem.save();
//       return res.status(200).json(cartItem);
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };
