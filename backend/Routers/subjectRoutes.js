import express from "express";

import {
  createSubject,
  getSubjects,
  getSubject,
  updateSubject,
  deleteSubject,
  assignSubjectToStream,
} from "../Controllers/subjectController.js";

const router = express.Router();

router.post("/", createSubject);
router.post("/assign", assignSubjectToStream);

router.get("/", getSubjects);
router.get("/:id", getSubject);

router.put("/:id", updateSubject);
router.delete("/:id", deleteSubject);

export default router;