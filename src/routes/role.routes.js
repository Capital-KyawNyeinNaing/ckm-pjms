const express = require("express");

const {
  getAllRole,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} = require("../controller/role.controller");
const Role = require("../model/Role");
const advancedResult = require("../middleware/advancedResult");

const router = express.Router({ mergeParams: true });

// router.use(protect);

router
  .route("/")
  .get(
    // authorize("role", "list"),
    advancedResult(Role),
    getAllRole
  )
  .post(
    // authorize("role", "create"),
    createRole
  );

router
  .route("/:id")
  .get(
    // authorize("role", "detail"),
    getRoleById
  )
  .put(
    // authorize("role", "update"),
    updateRole
  )
  .delete(
    // authorize("role", "delete"),
    deleteRole
  );

module.exports = router;
