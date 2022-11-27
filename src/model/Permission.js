const mongoose = require("mongoose");

const PermissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please add a permission name"],
    },
    key: {
      type: String,
      required: [true, "Please add a key"],
    },
    description: {
      type: String,
      required: [true, "Please add a permission description"],
    },
    action: {
      type: String,
      required: [true, "Please add a action description"],
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
