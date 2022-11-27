const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter name'],
    },
    email: {
      type: String,
      required: [true, 'Please enter email'],
      // unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please enter password'],
      minlength: 6,
      select: false,
    },
    contactNumber: {
      type: String,
    },
    image: {
      type: mongoose.Schema.ObjectId,
      ref: 'File',
    },
    roleId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Role',
    },
    resetPasswordWebToken: String,
    resetPasswordExpire: Date,
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

// Update isPending field to false after registered
UserSchema.post('save', async function (result) {
  // 1) Check if pending user exists
  await mongoose
    .model('PendingUser')
    .findOneAndUpdate(
      { email: result.email },
      { isPending: false, otpCode: undefined }
    );
});

// Encrypt password using
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// generate token
UserSchema.methods.getSignedToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET_KEY || 'asdf123479890jasldfkj',
    {
      expiresIn: process.env.JWT_EXPIRED || '30d',
    }
  );
};

// isMatch password
UserSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

// reset password
UserSchema.methods.getResetPasswordToken = async function () {
  //? generate token
  let resetToken = crypto.randomBytes(20).toString('hex');

  //? hash token
  this.resetPasswordWebToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', UserSchema);

module.exports = {
  User,
  UserSchema,
};
