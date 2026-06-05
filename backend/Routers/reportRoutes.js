import express from "express";

import {
  generateStudentReport,
} from "../controllers/reportController.js";

const router = express.Router();

router.get(
  "/student/:studentId",
  generateStudentReport
);

export default router;