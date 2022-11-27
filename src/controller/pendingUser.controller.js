const PendingUser = require("../model/PendingUser");
const {
  getAll,
  getOneById,
  createOne,
  updateOne,
  deleteOne,
  deleteMany,
} = require("./base.controller");

exports.getAllPendingUsers = getAll(PendingUser);
exports.getPendingUserById = getOneById(PendingUser);
exports.createPendingUser = createOne(PendingUser);
exports.updatePendingUser = updateOne(PendingUser);
exports.deletePendingUser = deleteOne(PendingUser);
exports.deletePendingUsers = deleteMany(PendingUser);
