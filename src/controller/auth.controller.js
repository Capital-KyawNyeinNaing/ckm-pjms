const crypto = require('crypto');

const { User } = require('../model/User');
const PendingUser = require('../model/PendingUser');
const ErrorResponse = require('../util/errorres');
const asyncHandler = require('../middleware/async');
const sendEmail = require('../util/sendEmail');

exports.checkOTP = asyncHandler(async (req, res, next) => {
  const { email, otpCode } = req.body;

  if (!email)
    return next(new ErrorResponse(400, 'Please provide email address'));

  if (!otpCode) return next(new ErrorResponse(400, 'Please provide OTP code'));

  const pendingUser = await PendingUser.findOne({ email });

  // 1) Check if requested user exists
  if (!pendingUser)
    return next(new ErrorResponse(400, 'You are not requested user'));

  // 2) Check if OTP matches
  if (pendingUser.otpCode !== otpCode) {
    return next(new ErrorResponse(400, 'Incorrect OTP'));
  }

  res.status(200).json({
    status: 'success',
    data: pendingUser,
  });
});

// signup
exports.signUp = asyncHandler(async (req, res, next) => {
  const { name, email, password, roleId, companyId, image, contactNumber } =
    req.body;

  const user = await User.create({
    name,
    email,
    password,
    roleId,
    companyId,
    image,
    contactNumber,
  });

  await sendCookieResponse(user, 200, res);
});

// signin
exports.signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse(400, `Please provide email and password`));
  }

  // check exit in db
  const user = await User.findOne({ email }).select('+password');

  console.log('user => ', user);

  if (!user) {
    return next(new ErrorResponse(401, `Invalid Credential`));
  }

  // isMatch password
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    console.log('match');
    return next(new ErrorResponse(401, `Invalid Credential`));
  }

  await sendCookieResponse(user, 200, res);
});

// signout
exports.signOut = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: null,
  });
});

// forgot password
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse(404, `user does not exit`));
  }

  let resetToken = await user.getResetPasswordToken();

  await user.save({ ValidateBeforeSave: false });

  // create resetUrl
  let resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetpassword/${resetToken}`;

  let message = `You are receiving this email because you has requested the reset of a password.Please make a PUT request to \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Password reset token',
      message,
    });

    res.status(200).json({ success: true, data: 'Send Email' });
  } catch (err) {
    console.log(err);
    user.resetPasswordWebToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ ValidateBeforeSave: false });

    return next(new ErrorResponse(500, 'Email could not sent'));
  }

  res.status(200).json({
    success: true,
    data: user,
  });
});

// reset password
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;

  let resetPasswordWebToken = await crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  // check resetPasswordWebToken and resetPasswordExpire
  let user = await User.findOne({
    resetPasswordWebToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse(400, 'Invalid token'));
  }
  user.password = password;
  user.resetPasswordWebToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  await sendCookieResponse(user, 200, res);
});

// change password
exports.changePassword = asyncHandler(async (req, res, next) => {
  const { current_pass, new_pass } = req.body;

  let user = await User.findById(req.user.id).select('+password');

  // check current password
  let isMatch = await user.matchPassword(current_pass);
  if (!isMatch) {
    return next(new ErrorResponse(400, 'incorrect password'));
  }

  user.password = new_pass;
  await user.save();

  await sendCookieResponse(user, 200, res);
});

// get user
exports.getCurrentLoginUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

// user details
exports.userDetail = asyncHandler(async (req, res, next) => {
  console.log('req', req.user, req.body);
  const { name, email } = req.body;

  let updateDetail = {
    name,
    email,
  };

  let user = await User.findByIdAndUpdate(req.user.id, updateDetail, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// get jwt token from models and send cookie res
const sendCookieResponse = async (user, statusCode, res) => {
  const token = await user.getSignedToken();

  const options = {
    expires: new Date(
      Date.now() + (process.env.COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};
