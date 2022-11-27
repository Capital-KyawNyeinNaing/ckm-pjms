const Member = require("../model/Member");

const {
  getAll,
  getOneById,
  createOne,
  updateOne,
  deleteOne,
} = require("./base.controller");

exports.getAllMembers = getAll(Member);
exports.getMemberById = getOneById(Member);
exports.createMember = createOne(Member);
exports.updateMember = updateOne(Member);
exports.deleteMember = deleteOne(Member);
