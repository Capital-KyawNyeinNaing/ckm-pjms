const Task = require('../model/Task');
const {
  getAll,
  getOneById,
  createOne,
  updateOne,
  deleteOne,
  deleteMany,
} = require('./base.controller');

exports.getAllTasks = getAll(Task);
exports.getTaskById = getOneById(Task);
exports.createTask = createOne(Task);
exports.updateTask = updateOne(Task);
exports.deleteTask = deleteOne(Task);
exports.deleteTasks = deleteMany(Task);
