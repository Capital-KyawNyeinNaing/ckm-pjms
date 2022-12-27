const File = require('../model/File');
const AppError = require('../util/appError');
const catchAsync = require('../util/catchAsync');
const baseController = require('./base.controller');

exports.getAllFiles = baseController.getAll(File);
exports.getFileById = baseController.getOneById(File);
exports.updateFile = baseController.updateOne(File);
exports.deleteFile = baseController.deleteOne(File);

exports.createFiles = catchAsync(async (req, res, next) => {
  const files = req.files;

  if (files?.length <= 0) {
    return next(new AppError('Please upload files', 400));
  }

  const newFiles = await Promise.all(
    files.map(async (file) => {
      return await File.create({
        name: file.originalname,
        type: file.mimetype,
        description: req.body?.description || null,
        path: file.path.split('uploads/')[1],
        size: file.size,
      });
    })
  );

  if (newFiles.length <= 0) {
    return next(new AppError('Something went wrong uploading files', 400));
  }

  res.status(201).json({
    status: 'success',
    data: newFiles,
  });
});
