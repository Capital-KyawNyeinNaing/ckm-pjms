const express = require('express');
const {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
} = require('../controller/member.controller');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllMembers)
  .post(createMember);

router
  .route('/:id')
  .get(getMemberById)
  .put(updateMember)
  .delete(deleteMember);

module.exports = router;
