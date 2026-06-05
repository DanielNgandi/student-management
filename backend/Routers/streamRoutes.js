import express from "express";

import {
  createStream,
  getStreams,
  getStream,
  updateStream,
  deleteStream,
} from "../Controllers/streamController.js";

const router = express.Router();

router.post("/", createStream);
router.get("/", getStreams);
router.get("/:id", getStream);
router.put("/:id", updateStream);
router.delete("/:id", deleteStream);

export default router;