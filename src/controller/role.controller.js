const Role = require("../model/Role");
const ErrorResponse = require("../util/errorres");
const asyncHandler = require("../middleware/async");

// get all role
exports.getAllRole = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResult);
});

// get role by id
exports.getRoleById = asyncHandler(async (req, res, next) => {
  let role = await Role.findById(req.params.id);

  if (!role) {
    return next(new ErrorResponse(400, `No role id with ${req.params.id}`));
  }

  res.status(200).json({
    success: true,
    data: role,
  });
});

// create role
exports.createRole = asyncHandler(async (req, res, next) => {
  const { roleName } = req.body;
  let role = await Role.findOne({ roleName }).populate("permissions");

  if (role) {
    return next(new ErrorResponse(400, `${roleName} already exist`));
  }

  let createdRole = await Role.create(req.body);

  res.status(201).json({
    success: true,
    data: createdRole,
  });
});

// update role
exports.updateRole = asyncHandler(async (req, res, next) => {
  let role = await Role.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({
    success: true,
    data: role,
  });
});

// delete role
exports.deleteRole = asyncHandler(async (req, res, next) => {
  let role = await Role.findById(req.params.id);

  if (!role) {
    return next(
      new ErrorResponse(400, `does not exist role id ${req.params.id}`)
    );
  }

  role.remove();

  res.status(200).json({
    success: true,
    data: null,
  });
});
