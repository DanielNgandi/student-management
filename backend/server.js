import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import streamRoutes from "./Routers/streamRoutes.js";
import studentRoutes from "./Routers/studentRoutes.js";
import subjectRoutes from "./Routers/subjectRoutes.js";
import scoreRoutes from "./Routers/scoreRoutes.js";
import reportRoutes from "./Routers/reportRoutes.js";
import errorHandler from "./Middlewares/errorHandler.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/streams", streamRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/reports", reportRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Student Management API Running",
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});