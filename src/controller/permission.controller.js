const Permission = require('../model/Permission')
const ErrorResponse = require('../util/errorres')
const asyncHandler = require('../middleware/async')

// get all permission
exports.getAllPermission = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResult)
})

// get permission by id
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

// create permission
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

// update permission
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

// delete permission
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
