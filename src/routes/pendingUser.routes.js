const express = require("express");

const {
  getAllPendingUsers,
  getPendingUserById,
  createPendingUser,
  updatePendingUser,
  deletePendingUser,
  deletePendingUsers,
} = require("../controller/pendingUser.controller");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route("/").get(getAllPendingUsers).post(createPendingUser);

router
  .route("/:id")
  .get(getPendingUserById)
  .put(updatePendingUser)
  .delete(deletePendingUser)
  .delete(deletePendingUsers);

module.exports = router;
