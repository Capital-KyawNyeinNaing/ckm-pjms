const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../util/errorres');

exports.getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    console.log(Model);
    let query;
    console.log(req.query);
    // copy req query
    let reqQuery = { ...req.query };

    // field to exclude
    const removeField = ['select', 'sort', 'page', 'limit'];

    // loop over remove and delete item from reqQuery
    removeField.forEach((item) => delete reqQuery[item]);

    let queryStr = JSON.stringify(reqQuery);

    queryStr = queryStr.replace(/\b(gt|lt|gte|lte)\b/g, (match) => `$${match}`);

    let jsonObj = JSON.parse(queryStr);
    let newObj = {};

    Object.keys(jsonObj).forEach(function (key, index) {
      if (jsonObj?.[key].indexOf(',') > -1) {
        let tmp = jsonObj?.[key].split(',');
        newObj[key] = tmp;
      } else {
        newObj[key] = jsonObj?.[key];
      }
    });

    // find query
    query = Model.find(newObj);

    // load query select
    if (req.query.select) {
      let field = req.query.select.split(',').join(' ');
      query = query.select(field);
    }

    // load query sort
    if (req.query.sort) {
      let sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createAt');
    }

    // population
    if (req.query.populate) {
      const popOptions = req.query.populate.split(',').join(' ');
      // console.log(popOptions);
      query = query.populate(popOptions);
    }

    // pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    query = query.skip(startIndex).limit(limit);

    let pagination = {};
    const total = await Model.countDocuments();

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

    let results = await query;

    res.status(200).json({
      success: true,
      count: results.length,
      pagination,
      data: results,
    });
  });

// @desc:     get one
exports.getOneById = (Model) =>
  asyncHandler(async (req, res, next) => {
    console.log(req.query);
    let query = Model.findById(req.params.id);

    // population
    if (req.query.populate) {
      const popOptions = req.query.populate.split(',').join(' ');

      query = query.populate(popOptions);
    }

    const doc = await query;

    if (!doc)
      return next(new ErrorResponse(404, 'No document found with that ID'));

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

// @desc:     create one
exports.createOne = (Model, popOptions) =>
  asyncHandler(async (req, res, next) => {
    if (req.user?._id) {
      req.body.userId = req.user._id;
      req.body.createdBy = req.user._id;
    }

    const newDoc = await Model.create(req.body);

    if (!newDoc) return next();

    let query = Model.findById(newDoc._id);

    if (popOptions) {
      popOptions.forEach((popOption) => {
        query = query.populate(popOption);
      });
    }

    const doc = await query;

    res.status(201).json({
      status: 'success',
      data: doc,
    });
  });

// @desc:     update one
exports.updateOne = (Model, popOptions) =>
  asyncHandler(async (req, res, next) => {
    if (req.user?._id) req.body.userId = req.user._id;

    let query = Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (popOptions) {
      popOptions.forEach((popOption) => {
        query = query.populate(popOption);
      });
    }

    const doc = await query;

    if (!doc)
      return next(new ErrorResponse(404, 'No document found with that ID'));

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc)
      return next(new ErrorResponse(404, 'No document found with that ID'));

    res.status(200).json({
      status: 'success',
      data: null,
    });
  });

// @desc: delete many
exports.deleteMany = (Model) =>
  asyncHandler(async (req, res, next) => {
    let deleteIds = req?.body?.data?.ids;
    console.log(deleteIds);

    // if (deleteIds?.length > 0) {
    //   await Model.deleteMany({
    //     _id: {
    //       $in: deleteIds,
    //     },
    //   });
    //   res.status(200).json({
    //     status: "success",
    //     data: null,
    //   });
    // } else {
    //   return next(new ErrorResponse(400, `does not exist id ${req.params.id}`));
    // }
  });
