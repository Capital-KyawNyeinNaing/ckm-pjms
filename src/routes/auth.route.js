const express = require("express");

const {
  checkOTP,
  signUp,
  signIn,
  signOut,
  getCurrentLoginUser,
  forgotPassword,
  resetPassword,
  userDetail,
  changePassword,
} = require("../controller/auth.controller");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/checkOTP").post(checkOTP);
router.route("/signUp").post(signUp);
router.route("/signIn").post(signIn);
router.route("/signOut").get(signOut);
router.route("/me").get(protect, getCurrentLoginUser);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:resettoken").put(resetPassword);
router.route("/updateuserdetail").put(protect, userDetail);
router.route("/changepasword").put(protect, changePassword);

module.exports = router;
