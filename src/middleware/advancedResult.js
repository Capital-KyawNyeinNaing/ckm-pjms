const advancedResult = (models, populate) => async (req, res, next) => {
  let query;

  // copy req query
  let reqQuery = { ...req.query };

  // field to exclude
  const removeField = ["select", "sort", "page", "limit"];

  // loop over remove and delete item from reqQuery
  removeField.forEach((item) => delete reqQuery[item]);

  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(/\b(gt|lt|gte|lte)\b/g, (match) => `$${match}`);

  // find query
  query = models.find(JSON.parse(queryStr));

  // load query select
  if (req.query.select) {
    let field = req.query.select.split(",").join(" ");
    query = query.select(field);
  }

  // load query sort
  if (req.query.sort) {
    let sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createAt");
  }

  // pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await models.countDocuments();

  if (populate) {
    query = query.populate(populate);
  }

  query = query.skip(startIndex).limit(limit);

  let results = await query;

  let pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.next = {
      page: page - 1,
      limit,
    };
  }

  res.advancedResult = {
    success: true,
    count: total,
    pagination,
    data: results,
  };

  next();
};

module.exports = advancedResult;
