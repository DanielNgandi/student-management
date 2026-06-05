import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Reports() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data || []);
    } catch (error) {
      console.error("Error loading students", error);
    }
  };

  // 🔥 GENERATE REPORT
  const generateReport = async (studentId) => {
  try {
    setLoading(true);

    const response = await api.get(
      `/reports/student/${studentId}`, 
      {
        responseType: "blob",
      }
    );

    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: "application/pdf" })
    );

    window.open(url);
  } catch (error) {
    console.error("Error generating report", error);
    alert("Failed to generate report");
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={styles.container}>
      <h1>Reports Center</h1>

      <p style={styles.subtitle}>
        Generate student report cards (PDF)
      </p>

      <div style={styles.grid}>
        {students.map((s) => (
          <div key={s.id} style={styles.card}>
            <h3>
              {s.firstName} {s.lastName}
            </h3>

            <p style={styles.text}>
              Admission No: {s.admissionNo}
            </p>

            <p style={styles.text}>
              Stream: {s.stream?.name}
            </p>

            <button
              style={styles.btn}
              onClick={() =>
                generateReport(
                  s.id,
                  `${s.firstName} ${s.lastName}`
                )
              }
              disabled={loading}
            >
              {loading ? "Generating..." : "Download Report"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },

  subtitle: {
    marginBottom: "20px",
    color: "gray",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },

  text: {
    fontSize: "13px",
    color: "gray",
    marginBottom: "5px",
  },

  btn: {
    marginTop: "10px",
    background: "#1d4ed8",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
  },
};