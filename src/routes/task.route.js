const express = require('express');

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  deleteTasks,
} = require('../controller/task.controller');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route('/').get(getAllTasks).post(createTask);

router
  .route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask)
  .delete(deleteTasks);

module.exports = router;
