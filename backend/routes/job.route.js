import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { deleteJob, duplicateJob, getAdminJobs, getAllJobs, getJobById, getJobBySlug, incrementJobViews, postJob, toggleFilledStatus, updateJob } from "../controllers/job.controller.js";

const router=express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/getadminjobs").get(isAuthenticated,getAdminJobs);
router.route("/getslug/:slug").get(getJobBySlug);
router.route("/get/:id").get(getJobById);
router.route("/update/:id").put(isAuthenticated,updateJob);
router.route("/delete/:id").delete(isAuthenticated,deleteJob);
router.route('/duplicate/:id').post(isAuthenticated, duplicateJob);
router.route("/view/:id").get(incrementJobViews);
router.route("/get/:id").get(getJobById);
router.route("/get").get(getAllJobs);
// Toggle filled status
router.route("/toggle-filled/:id").patch( isAuthenticated, toggleFilledStatus);
export default router;



// view wale me error //or responsive check // copy krna alg bhi
