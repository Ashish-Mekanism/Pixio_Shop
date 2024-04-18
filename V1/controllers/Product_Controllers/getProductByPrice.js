import { productData } from "../../utility/productData.js";

export const getAllProductsByPrice = (req, res) => {
  try {
    const minPrice = parseFloat(req.query.minPrice);
    const maxPrice = parseFloat(req.query.maxPrice);
    if (isNaN(minPrice) || isNaN(maxPrice) || minPrice >= maxPrice) {
      return res.status(400).json({
        status: "error",
        message: "Invalid price range parameters",
      });
    }

    const productsInRange = productData.filter(
      (product) => product.price >= minPrice && product.price <= maxPrice
    );

    return res.status(200).json({
      status: "success",
      data: productsInRange,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
