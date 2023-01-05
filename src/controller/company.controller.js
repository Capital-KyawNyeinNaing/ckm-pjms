const Company = require('../model/Company');
const AppError = require('../util/appError');
const asyncHandler = require('../middleware/async');
const {
  getAll,
  getOneById,
  createOne,
  updateOne,
  deleteOne,
} = require('./base.controller');

exports.getAllCompany = getAll(Company);
exports.getCompanyById = getOneById(Company);
exports.createCompany = createOne(Company);
exports.updateCompany = updateOne(Company);
exports.deleteCompany = deleteOne(Company);

exports.getMyCompany = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError('Please signed in to get access', 400));
  }

  let query = Company.findById(req.user.companyId);

  // 1) POPULATION
  if (req.query.populate) {
    const popOptions = req.query.populate.split(',').join(' ');

    query = query.populate(popOptions);
  }

  const company = await query;

  res.status(200).json({
    status: 'success',
    data: company,
  });
});