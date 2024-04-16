import { productData } from "../utility/productData.js";

export const getAllProducts = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: productData,
    });
  } catch (error) {
    console.log(error);
  }
};
