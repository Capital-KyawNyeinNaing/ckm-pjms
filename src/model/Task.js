const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      trim: true,
      required: [true, 'Task name is required!'],
    },
    taskDescription: {
      type: String,
      required: [true, 'Task description is required!'],
    },
    companyId: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'Company ID is required!'],
      ref: 'Company',
    },
    attachment: {
      type: mongoose.Schema.ObjectId,
      ref: 'File',
    },
    taskStatus: {
      type: String,
      enum: ['open', 'improgress', 'resolved', 'closed'],
      required: [true, 'Task status is required!'],
    },
    taskAssignedMember: [
      {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Task assign members is required!'],
        ref: 'Project',
      },
    ],
    taskAssignedProject: {
      type: mongoose.Schema.ObjectId,
      required: [true, 'Task assign project is required!'],
      ref: 'Member',
    },
    companyId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Company',
      required: true,
    },
    timeline: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
