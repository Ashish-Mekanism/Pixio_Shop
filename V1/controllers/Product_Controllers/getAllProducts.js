import Product from "../../models/productModel.js";
import { getPaginatedData } from "../../utils/pagination_utils.js";

export const getAllProducts = async (req, res) => {
  const { filterSearchValues, page, per_page } = req.body;
  if (!filterSearchValues) {
    return res
      .status(400)
      .json({ error: "Missing filterSearchValues in the request body" });
  }

  const { category, search_query, minPrice, maxPrice } = filterSearchValues;

  try {
    let query = {};

    if (category) {
      query.category = {
        $regex: new RegExp(category, "i"),
      };
    }
    if (search_query) {
      query.title = {
        $regex: new RegExp(search_query, "i"),
      };
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      if (isNaN(min) || isNaN(max) || min < 0 || max < 0 || min >= max) {
        return res.status(400).json({
          error: "Invalid price range",
        });
      }
      query.price = { $gte: min, $lte: max };
    }

    const products = await Product.find(query);

    if (!products.length) {
      return res.status(404).json({ error: "No Products Found" });
    }

    const formattedProducts = category
      ? products.map((product) => ({
          category: product.category,
          search_query: product.title,
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
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};
