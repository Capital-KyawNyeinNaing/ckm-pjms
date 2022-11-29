const mongoose = require('mongoose');
const otpGenerator = require('otp-generator');
const sendEmail = require('../util/sendEmail');

const PendingUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please add email'],
    },
    otpCode: {
      type: String,
    },
    roleId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Role',
      required: [true, 'Please add role'],
    },
    companyId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Company',
    },
    isPending: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

PendingUserSchema.pre('save', async function (next) {
  const user = await mongoose.model('User').findById(this.createdBy);

  this.companyId = user.companyId;

  const otp = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  this.otpCode = otp;

  const emails = [this.email];

  await sendEmail({
    emails,
    subject: 'OTP for Creating User Account',
    message: `Please use the following OTP to register your account
    OTP: ${otp}`,
  });

  next();
});

module.exports = mongoose.model('PendingUser', PendingUserSchema);
