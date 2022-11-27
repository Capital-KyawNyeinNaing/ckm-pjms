const Company = require('../model/Company');
const ErrorResponse = require('../util/errorres');
const asyncHandler = require('../middleware/async');

// get all company
exports.getAllCompany = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResult);
});

// get company by id
exports.getCompanyById = asyncHandler(async (req, res, next) => {
  let company = await Company.findById(req.params.id);

  if (!company) {
    return next(new ErrorResponse(400, `No company id with ${req.params.id}`));
  }

  res.status(200).json({
    success: true,
    data: company,
  });
});

// create company
exports.createCompany = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  console.log();
  let company = await Company.findOne({ name });

  if (company) {
    return next(
      new ErrorResponse(
        400,
        `${!name ? 'Company name is' : name} already exists`
      )
    );
  }

  let resCompany = await Company.create(req.body);

  res.status(201).json({
    success: true,
    data: resCompany,
  });
});

// update company
exports.updateCompany = asyncHandler(async (req, res, next) => {
  let company = await Company.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    data: company,
  });
});

// delete company
exports.deleteCompany = asyncHandler(async (req, res, next) => {
  let company = await Company.findById(req.params.id);

  if (!company) {
    return next(
      new ErrorResponse(400, `does not exist company id ${req.params.id}`)
    );
  }

  company.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
