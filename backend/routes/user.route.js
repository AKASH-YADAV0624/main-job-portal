import express from "express";
import {changePassword, getAllCandidates, getUserById, login,logout,register,submit,updateProfile} from"../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router=express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
router.route("/profile/submit").post(isAuthenticated,singleUpload,submit);
router.route("/password/change").put(isAuthenticated, changePassword);
router.route("/candidates").get(isAuthenticated, getAllCandidates);
router.route("/get/:id").get(isAuthenticated,getUserById);

export default router;