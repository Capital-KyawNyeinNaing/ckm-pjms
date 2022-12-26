const Project = require("../model/Project");

const {
  getAll,
  getOneById,
  createOne,
  updateOne,
  deleteOne,
} = require("./base.controller");

exports.getAllProjects = getAll(Project);
exports.getProjectById = getOneById(Project);
exports.createProject = createOne(Project);
exports.updateProject = updateOne(Project);
exports.deleteProject = deleteOne(Project);
