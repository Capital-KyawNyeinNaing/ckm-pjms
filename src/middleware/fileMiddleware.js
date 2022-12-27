const multer = require('multer');
const path = require('path');
const AppError = require('../util/appError.js');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let destination = 'public/uploads';

    if (file.fieldname === 'image') {
      destination += '/images';
    } else {
      destination += '/others';
    }

    cb(null, destination);
  },

  filename: (req, file, cb) => {
    const splitFileName = file.originalname.split('.')
    cb(
      null,
      `${splitFileName[0]}-${Date.now()}-${Math.round(Math.random() * 1e9)}.${splitFileName[1]}`
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
