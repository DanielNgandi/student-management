import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Scores() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [scores, setScores] = useState([]);

  const [form, setForm] = useState({
    studentId: "",
    subjectId: "",
    catScore: "",
    examScore: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [s1, s2] = await Promise.all([
      api.get("/students"),
      api.get("/subjects"),
    ]);

    setStudents(s1.data);
    setSubjects(s2.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 👇 FIX: Convert IDs to numbers and ensure scores are numbers
    const payload = {
      studentId: Number(form.studentId),    // Convert string to number
      subjectId: Number(form.subjectId),    // Convert string to number
      catScore: Number(form.catScore),      // Convert to number
      examScore: Number(form.examScore),    // Convert to number
    };

    try {
      await api.post("/scores", payload);

      setForm({
        studentId: "",
        subjectId: "",
        catScore: "",
        examScore: "",
      });

      alert("Score saved successfully!");
    } catch (error) {
      console.error("Error saving score:", error);
      alert(error.response?.data?.message || "Error saving score");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Scores Management</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <select
          name="studentId"
          value={form.studentId}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="">Select Student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.firstName} {s.lastName}
            </option>
          ))}
        </select>

        <select
          name="subjectId"
          value={form.subjectId}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="">Select Subject</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <input
          name="catScore"
          type="number"
          placeholder="CAT Score"
          value={form.catScore}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          name="examScore"
          type="number"
          placeholder="Exam Score"
          value={form.examScore}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button style={styles.btn} type="submit">Save Score</button>
      </form>
    </div>
  );
}

const styles = {
  container: { padding: "20px" },

  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: "12px",
    marginBottom: "20px",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  btn: {
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    padding: "10px",
  },
};