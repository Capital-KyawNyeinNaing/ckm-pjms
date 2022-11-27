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
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
