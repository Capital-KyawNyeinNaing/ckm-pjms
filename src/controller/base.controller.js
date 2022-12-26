const asyncHandler = require('../middleware/async');
const APIFeatures = require('../util/apiFeatures');
const ErrorResponse = require('../util/errorres');

// get all
exports.getAll = (Model) =>
  asyncHandler(async (req, res, next) => {
    const count = await Model.countDocuments();

    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .select()
      .populate()
      .paginate(count);

    const data = await features.query;

    res.status(200).json({
      success: true,
      count: data.length,
      pagination: features.pagination,
      data,
    });
  });

// get one
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

// create
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

// update
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

// delete one
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

// delete many
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
