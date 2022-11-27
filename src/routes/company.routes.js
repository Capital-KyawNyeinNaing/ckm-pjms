const express = require('express');

const {
  getAllCompany,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} = require('../controller/company.controller');
const Company = require('../model/Company');
const advancedResult = require('../middleware/advancedResult');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route('/')
  .get(authorize('company', 'list'), advancedResult(Company), getAllCompany)
  .post(authorize('company', 'create'), createCompany);

router
  .route('/:id')
  .get(authorize('company', 'detail'), getCompanyById)
  .put(authorize('company', 'update'), updateCompany)
  .delete(authorize('company', 'delete'), deleteCompany);

module.exports = router;
