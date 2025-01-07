import express from "express";
import { generateSitemap } from "../controllers/sitemap.controller.js";


const router=express.Router();

router.route("/dynamicsitemap.xml").get(generateSitemap);

export default router;