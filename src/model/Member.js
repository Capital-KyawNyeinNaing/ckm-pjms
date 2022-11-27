const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name field is required'],
    },
    email: {
      type: String,
      required: [true, 'Email field is required'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number field is required'],
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Member = mongoose.model('Member', MemberSchema);

module.exports = Member;
