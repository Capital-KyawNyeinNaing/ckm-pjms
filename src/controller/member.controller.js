const asyncHandler = require('../middleware/async');
const Member = require('../model/Member');
const AppError = require('../util/appError');

const {
  getAll,
  getOneById,
  updateOne,
  deleteOne,
} = require('./base.controller');

const createOne = (Model, popOptions) =>
  asyncHandler(async (req, res, next) => {
    const checkExist = await Model.findOne({
      $or: [{ email: req.body.email }],
    });

    if (checkExist) {
      return next(new AppError('Email is already exists!', 422));
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

exports.getAllMembers = getAll(Member);
exports.getMemberById = getOneById(Member);
exports.createMember = createOne(Member);
exports.updateMember = updateOne(Member);
exports.deleteMember = deleteOne(Member);
