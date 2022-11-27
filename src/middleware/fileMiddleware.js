const multer = require('multer');
const path = require('path');
const AppError = require('../util/appError.js');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let destination = 'public';

    if (file.fieldname === 'image') {
      destination += '/images';
    } else {
      destination += '/others';
    }

    cb(null, destination);
  },

  filename: (req, file, cb) => {
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  const extension = path.extname(file.originalname);
  const allowableExtensions = ['.png', '.jpg', '.jpeg', '.pdf'];

  if (allowableExtensions.includes(extension)) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        'Only allowed PNG, JPG, JPEG, PDF extensions. Please try again',
        400
      ),
      false
    );
  }
};

exports.upload = multer({
  storage,
  fileFilter,
});
