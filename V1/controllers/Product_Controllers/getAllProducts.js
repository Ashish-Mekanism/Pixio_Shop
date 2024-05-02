// import Product from "../../models/productModel.js";
// import { getPaginatedData } from "../../utils/pagination_utils.js";

// export const getAllProducts = async (req, res) => {
//   try {
//     const { page, per_page } = req.query;

//     const products = await Product.find();
//     const getAllProduct = getPaginatedData(products, page, per_page, req);

//     const total = products.length;
//     console.log(getAllProduct.length);

//     return res.status(200).json({
//       total,
//       data: getAllProduct,
//     });
//   } catch (error) {
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// };

import Product from "../../models/productModel.js";
import { getPaginatedData } from "../../utils/pagination_utils.js";

export const getAllProducts = async (req, res) => {
  const { category, title } = req.params;
  const { minPrice, maxPrice, page, per_page } = req.query;

  try {
    let query = {};

    if (category) {
      query.category = {
        $regex: new RegExp(category, "i"),
      };
    }
    if (title) {
      query.title = {
        $regex: new RegExp(title, "i"),
      };
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      if (
        isNaN(minPrice) ||
        isNaN(maxPrice) ||
        minPrice < 0 ||
        maxPrice < 0 ||
        minPrice >= maxPrice
      ) {
        return res.status(400).json({
          error: "Invalid price range",
        });
      }
      query.price = { $gte: minPrice, $lte: maxPrice };
    }
    const products = await Product.find(query);

    if (!products.length) {
      return res.status(404).json({ error: "No Products Found" });
    }

    const formattedProducts = category
      ? products.map((product) => ({
          category: product.category,
          title: product.title,
          discount: product.discount,
          price: product.price,
          images: product.images[0],
        }))
      : products;

    const paginatedProducts = getPaginatedData(
      formattedProducts,
      page,
      per_page,
      req
    );

    return res.status(200).json({
      total: formattedProducts.length,
      data: paginatedProducts,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
