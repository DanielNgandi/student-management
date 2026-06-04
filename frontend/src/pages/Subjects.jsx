import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const res = await api.get("/subjects");
      setSubjects(res.data || []);
    } catch (error) {
      console.error("Failed to load subjects", error);
      setSubjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!name.trim()) return alert("Subject name required");

      if (editingId) {
        await api.put(`/subjects/${editingId}`, { name });
      } else {
        await api.post("/subjects", { name });
      }

      setName("");
      setEditingId(null);
      fetchSubjects();
    } catch (error) {
      console.error(error);
      alert("Error saving subject");
    }
  };

  const handleEdit = (subject) => {
    setName(subject.name);
    setEditingId(subject.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this subject?")) return;

    try {
      await api.delete(`/subjects/${id}`);
      fetchSubjects();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Cannot delete subject");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Subjects Management</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter subject name"
          style={styles.input}
        />

        <button style={styles.btn}>
          {editingId ? "Update" : "Create"}
        </button>
      </form>

      {/* LOADING */}
      {loading && <p>Loading subjects...</p>}

      {/* GRID */}
      <div style={styles.grid}>
        {subjects.map((sub) => (
          <div key={sub.id} style={styles.card}>
            <h3>{sub.name}</h3>

            {/* ONLY ACTIONS - CLEAN UI */}
            <div style={styles.actions}>
              <button onClick={() => handleEdit(sub)} style={styles.editBtn}>
                Edit
              </button>

              <button
                onClick={() => handleDelete(sub.id)}
                style={styles.deleteBtn}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "20px" },

  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    flex: 1,
  },

  btn: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },

  actions: {
    display: "flex",
    gap: "8px",
    marginTop: "10px",
  },

  editBtn: {
    background: "#f59e0b",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
  },

  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
  },
};