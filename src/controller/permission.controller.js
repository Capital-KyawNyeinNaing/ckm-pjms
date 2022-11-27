const Permission = require('../model/Permission')
const ErrorResponse = require('../util/errorres')
const asyncHandler = require('../middleware/async')

// @desc:     get all permission
// @route:    get /api/v1/permission
// @access:   private/admin
exports.getAllPermission = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResult)
})

// @desc:     get permission by id
// @route:    get /api/v1/permission/:id
// @access:   private/admin
exports.getPermissionById = asyncHandler(async (req, res, next) => {
  let permission = await Permission.findById(req.params.id)

  if (!permission) {
    return next(new ErrorResponse(400, `No permission id with ${req.params.id}`))
  }

  res.status(200).json({
    success: true,
    data: permission,
  })
})

// @desc:     create permission
// @route:    post /api/v1/permission
// @access:   private/admin
exports.createPermission = asyncHandler(async (req, res, next) => {
  const { name } = req.body
  let permission = await Permission.findOne({ name })

  if (permission) {
    return next(new ErrorResponse(400, `${name} already exist`))
  }

  let resPermission = await Permission.create(req.body)

  res.status(201).json({
    success: true,
    data: resPermission,
  })
})

// @desc:     update permission
// @route:    put /api/v1/permission/:id
// @access:   private/admin
exports.updatePermission = asyncHandler(async (req, res, next) => {
  let permission = await Permission.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(201).json({
    success: true,
    data: permission,
  })
})

// @desc:     delete permission
// @route:    delete /api/v1/permission/:id
// @access:   private/admin
exports.deletePermission = asyncHandler(async (req, res, next) => {
  let permission = await Permission.findById(req.params.id)

  if (!permission) {
    return next(
      new ErrorResponse(400, `does not exist permission id ${req.params.id}`)
    )
  }

  permission.remove()

  res.status(200).json({
    success: true,
    data: {},
  })
})
