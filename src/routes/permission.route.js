const express = require("express");

const {
  getAllPermission,
  getPermissionById,
  createPermission,
  updatePermission,
  deletePermission,
} = require("../controller/permission.controller");
const Permission = require("../model/Permission");
const advancedResult = require("../middleware/advancedResult");

const router = express.Router({ mergeParams: true });

// router.use(protect)

router
  .route("/")
  .get(
    // authorize("permission", "list"),
    advancedResult(Permission),
    getAllPermission
  )
  .post(
    // authorize("permission", "create"),
    createPermission
  );

router
  .route("/:id")
  .get(
    getPermissionById
  )
  .put(
    updatePermission
  )
  .delete(
    deletePermission
  );

module.exports = router;
