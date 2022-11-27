const express = require('express');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controller/user.controller');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route('/')
  .get(authorize('user', 'list'), getAllUsers)
  .post(authorize('user', 'create'), createUser);

router
  .route('/:id')
  .get(authorize('user', 'details'), getUserById)
  .put(authorize('user', 'update'), updateUser)
  .delete(authorize('user', 'delete'), deleteUser);

module.exports = router;
