import { productData } from "../utility/productData.js";

export const getAllProductsByCategory = (req, res) => {
  const { category } = req.params;

  if (category) {
    const filteredProducts = productData.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );

    if (filteredProducts.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Products not found in this category",
      });
    }

    return res.status(200).json({
      status: "success",
      data: filteredProducts,
    });
  }

  const productCategories = Array.from(
    new Set(productData.map((product) => product.category))
  );

  res.status(200).json({
    status: "success",
    data: productCategories,
  });
};
