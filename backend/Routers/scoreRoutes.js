import express from "express";

import validateScore from "../Middlewares/validateScore.js";

import {
  createScore,
  updateScore,
  getStudentPerformance,
  getClassPerformance,
} from "../Controllers/scoreController.js";

const router = express.Router();

router.post(
  "/",
  validateScore,
  createScore
);

router.put(
  "/:id",
  validateScore,
  updateScore
);

router.get(
  "/student/:studentId",
  getStudentPerformance
);

router.get(
  "/subject/:subjectId",
  getClassPerformance
);

export default router;