const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      trim: true,
      required: [true, 'Name field is required'],
    },
    taskDescription: {
      type: String,
      required: [true, 'Description field is required!'],
    },
    attachment: {
      type: mongoose.Schema.ObjectId,
      ref: 'File',
    },
    task_status: {
      type: String,
      enum: ['open', 'improgress', 'resolved', 'closed'],
      required: [true, 'Task status is required!'],
    },
    task_assigned: {
      type: mongoose.Schema.ObjectId,
      ref: 'Member',
    },
    timeline: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
