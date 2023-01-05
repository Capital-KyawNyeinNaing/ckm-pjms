const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      trim: true,
      required: [true, 'Name field is required'],
    },
    projectDescription: {
      type: String,
      required: [true, 'Description field is required'],
    },
    projectImage: {
      type: mongoose.Schema.ObjectId,
      ref: 'File',
    },
    includeMember: [
      {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Task assign members is required!'],
        ref: 'Member',
      },
    ],
    tasks: [
      {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Task field is required!'],
        ref: 'Task',
      },
    ],
    companyId: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'Company ID is required'],
      ref: 'Company',
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
