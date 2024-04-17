import { productData } from "../utility/productData.js";

export const getAllProducts = (req, res) => {
  const page = req.query.page || 1;
  const per_page = req.query.per_page || 30;

  try {
    const total = productData.length;
    const startIndex = (page - 1) * per_page;
    const endIndex = page * per_page;
    const getAllProductsProduct = productData.slice(startIndex, endIndex);
    console.log(getAllProductsProduct.length);

    return res.status(200).json({
      status: "success",
      total: total,
      data: getAllProductsProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
