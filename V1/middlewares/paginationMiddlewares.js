export const paginationMiddleware = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.per_page) || 30;

  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;

  req.pagination = {
    page,
    perPage,
    startIndex,
    endIndex,
  };

  next();
};
