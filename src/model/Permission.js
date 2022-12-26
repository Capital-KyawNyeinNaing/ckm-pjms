const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Permission name is required!"],
    },
    key: {
      type: String,
      required: [true, "Permission key is required!"],
    },
    description: {
      type: String,
      required: [true, "Permission description is required!"],
    },
    action: {
      type: String,
      required: [true, "Permission action is required!"],
    },
    status: {
      type: String,
      enum: ["active", "deleted"],
      default: "active",
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Permission", PermissionSchema);
