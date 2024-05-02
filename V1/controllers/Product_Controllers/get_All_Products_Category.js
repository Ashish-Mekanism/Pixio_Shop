import Product from "../../models/productModel.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    return res.status(200).json({ categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
