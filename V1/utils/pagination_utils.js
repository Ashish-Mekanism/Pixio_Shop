export const getPaginatedData = (products, page, per_page, req) => {
  const pageInt = parseInt(page) || 1;
  const perPage = parseInt(per_page) || 30;

  const startIndex = (pageInt - 1) * perPage;
  const endIndex = pageInt * perPage;

  req.pagination = {
    page: pageInt,
    perPage,
    startIndex,
    endIndex,
  };

  return products.slice(startIndex, endIndex);
};
