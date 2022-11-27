const { User } = require("../model/User");

const {
  getAll,
  getOneById,
  createOne,
  updateOne,
  deleteOne,
} = require("./base.controller");

exports.getAllUsers = getAll(User);
exports.getUserById = getOneById(User);
exports.createUser = createOne(User);
exports.updateUser = updateOne(User);
exports.deleteUser = deleteOne(User);
