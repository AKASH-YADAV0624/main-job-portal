import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { approveJob, getPendingJobs, rejectJob } from '../controllers/job.controller.js';
import { approveCompany, getPendingCompanies, rejectCompany } from '../controllers/company.controller.js';


const router = express.Router();

// Admin routes
router.route('/pending-jobs').get( isAuthenticated, getPendingJobs);
router.route('/approve-job/:id').put( isAuthenticated, approveJob);
router.route('/reject-job/:id').put( isAuthenticated, rejectJob);

//company
router.route("/pending").get(isAuthenticated, getPendingCompanies);
router.route("/approve/:id").patch(isAuthenticated, approveCompany);
router.route("/reject/:id").patch(isAuthenticated, rejectCompany);

export default router;
