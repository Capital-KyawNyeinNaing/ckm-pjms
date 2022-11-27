const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please add a name'],
    },
    type: {
      type: String,
      required: [true, 'Please add a type'],
    },
    description: {
      type: String,
    },
    path: {
      type: String,
      required: [true, 'Please add a path'],
    },
    size: {
      type: Number,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const File = mongoose.model('File', fileSchema);

module.exports = File;
