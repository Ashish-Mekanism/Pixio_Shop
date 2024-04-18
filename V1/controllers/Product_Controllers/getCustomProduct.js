import { productData } from "../../utility/productData.js";

export const getCustomProduct = (req, res) => {
  try {
    const { title } = req.params;

    const foundProduct = productData.filter((product) =>
      product.title.toLowerCase().includes(title.toLowerCase())
    );

    if (!foundProduct) {
      return res.status(404).json({
        status: "error",
        message: "Product not found with the specified title",
      });
    }

    return res.status(200).json({
      status: "success",
      data: foundProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
