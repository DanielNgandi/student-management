import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const [stats, setStats] = useState({
    students: 0,
    streams: 0,
    subjects: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [students, streams, subjects] = await Promise.all([
        api.get("/students"),
        api.get("/streams"),
        api.get("/subjects"),
      ]);

      setStats({
        students: students.data.length,
        streams: streams.data.length,
        subjects: subjects.data.length,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: "25px" }}>
        Welcome to Ikonex Academy Dashboard
      </h1>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Total Students</h3>
          <h1>{stats.students}</h1>
        </div>

        <div style={styles.card}>
          <h3>Total Streams</h3>
          <h1>{stats.streams}</h1>
        </div>

        <div style={styles.card}>
          <h3>Total Subjects</h3>
          <h1>{stats.subjects}</h1>
        </div>
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 3px 12px rgba(0,0,0,.08)",
  },
};