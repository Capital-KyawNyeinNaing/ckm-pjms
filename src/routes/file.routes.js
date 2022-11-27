const express = require('express');
const fileController = require('../controller/file.controller');
const authMiddleware = require('../middleware/authMiddleware');
const fileMiddleware = require('../middleware/fileMiddleware');

const router = express.Router();

// PROTECT THE ROUTE
// router.use(authMiddleware.protect);

router
  .route('/')
  .get(fileController.getAllFiles)
  .post(fileMiddleware.upload.any(), fileController.createFiles);
router
  .route('/:id')
  .get(fileController.getFileById)
  .patch(fileController.updateFile)
  .delete(fileController.deleteFile);

module.exports = router;
