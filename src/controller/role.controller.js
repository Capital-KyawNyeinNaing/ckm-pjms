const Role = require("../model/Role");
const ErrorResponse = require("../util/errorres");
const asyncHandler = require("../middleware/async");

// @desc:     get all role
// @route:    get /api/v1/role
// @access:   private/admin
exports.getAllRole = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResult);
});

// @desc:     get role by id
// @route:    get /api/v1/role/:id
// @access:   private/admin
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

// @desc:     create role
// @route:    post /api/v1/role
// @access:   private/admin
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

// @desc:     update role
// @route:    put /api/v1/role/:id
// @access:   private/admin
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

// @desc:     delete role
// @route:    delete /api/v1/role/:id
// @access:   private/admin
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
