const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      trim: true,
      required: [true, 'Role name is required!'],
    },
    roleType: {
      type: String,
      required: [true, 'Role type is required!'],
    },
    roleDescription: {
      type: String,
      required: [true, 'Role description is required!'],
    },
    status: {
      type: String,
      enum: ['active', 'deleted'],
      default: 'active',
    },
    companyId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Company',
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Role', RoleSchema);
