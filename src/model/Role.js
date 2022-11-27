const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      trim: true,
      required: [true, 'Role name field is required!'],
    },
    roleType: {
      type: String,
      required: [true, 'Role type field is required!'],
    },
    roleDescription: {
      type: String,
      required: [true, 'Role description field is required!'],
    },
    status: {
      type: String,
      enum: ['active', 'deleted'],
      default: 'active',
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Role', RoleSchema);
