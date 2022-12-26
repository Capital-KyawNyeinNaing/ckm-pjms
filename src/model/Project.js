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
