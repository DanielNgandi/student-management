import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Streams() {
  const [streams, setStreams] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchStreams();
  }, []);

  const fetchStreams = async () => {
    try {
      const res = await api.get("/streams");
      setStreams(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/streams/${editingId}`, { name });
      } else {
        await api.post("/streams", { name });
      }

      setName("");
      setEditingId(null);
      fetchStreams();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (stream) => {
    setName(stream.name);
    setEditingId(stream.id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this stream permanently?"
    );

    if (!confirmDelete) return;

    await api.delete(`/streams/${id}`);
    fetchStreams();
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Class Streams</h1>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter stream name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />

        <button style={styles.button}>
          {editingId ? "Update Stream" : "Add Stream"}
        </button>
      </form>

      <div style={styles.grid}>
        {streams.map((stream) => (
          <div key={stream.id} style={styles.card}>
            <h3>{stream.name}</h3>

            <p>
              Students: {stream.students?.length || 0}
            </p>

            <div style={styles.actions}>
              <button
                style={styles.editBtn}
                onClick={() => handleEdit(stream)}
              >
                Edit
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => handleDelete(stream.id)}
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
  container: {
    padding: "30px",
  },

  header: {
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "30px",
  },

  input: {
    flex: 1,
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "15px",
  },

  button: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    background: "#2563eb",
    color: "white",
    fontWeight: "600",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },

  actions: {
    display: "flex",
    gap: "10px",
    marginTop: "15px",
  },

  editBtn: {
    flex: 1,
    background: "#f59e0b",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  deleteBtn: {
    flex: 1,
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};