import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../layout/DashboardLayout";

import Dashboard from "../pages/Dashboard";
import Streams from "../pages/Streams";
import Students from "../pages/Students";
import Subjects from "../pages/Subjects";
import Scores from "../pages/Scores";
import Reports from "../pages/Reports";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />

        <Route path="streams" element={<Streams />} />
        <Route path="students" element={<Students />} />
        <Route path="subjects" element={<Subjects />} />
        <Route path="scores" element={<Scores />} />
        <Route path="reports" element={<Reports />} />
      </Route>
    </Routes>
  );
}