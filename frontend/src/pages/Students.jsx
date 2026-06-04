import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [streams, setStreams] = useState([]);

  const [formData, setFormData] = useState({
    admissionNo: "",
    firstName: "",
    lastName: "",
    streamId: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchStudents();
    fetchStreams();
  }, []);

  const fetchStudents = async () => {
    const res = await api.get("/students");
    setStudents(res.data);
  };

  const fetchStreams = async () => {
    const res = await api.get("/streams");
    setStreams(res.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 👇 FIX: Convert streamId to number before sending to backend
      const payload = {
        admissionNo: formData.admissionNo,
        firstName: formData.firstName,
        lastName: formData.lastName,
        streamId: formData.streamId ? Number(formData.streamId) : null,
      };

      if (editingId) {
        await api.put(`/students/${editingId}`, payload);
      } else {
        await api.post("/students", payload);
      }

      setFormData({
        admissionNo: "",
        firstName: "",
        lastName: "",
        streamId: "",
      });

      setEditingId(null);

      fetchStudents();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (student) => {
    setEditingId(student.id);

    setFormData({
      admissionNo: student.admissionNo,
      firstName: student.firstName,
      lastName: student.lastName,
      streamId: student.streamId, // This comes as number from backend, works fine
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Delete this student?"
    );

    if (!confirmed) return;

    await api.delete(`/students/${id}`);

    fetchStudents();
  };

  return (
    <div style={styles.container}>
      <h1>Student Management</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="admissionNo"
          placeholder="Admission Number"
          value={formData.admissionNo}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <select
          name="streamId"
          value={formData.streamId}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="">Select Stream</option>

          {streams.map((stream) => (
            <option
              key={stream.id}
              value={stream.id}
            >
              {stream.name}
            </option>
          ))}
        </select>

        <button style={styles.button} type="submit">
          {editingId ? "Update Student" : "Add Student"}
        </button>

        {editingId && (
          <button
            style={{...styles.button, background: "#6b7280"}}
            onClick={() => {
              setEditingId(null);
              setFormData({
                admissionNo: "",
                firstName: "",
                lastName: "",
                streamId: "",
              });
            }}
            type="button"
          >
            Cancel Edit
          </button>
        )}
      </form>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Admission No</th>
            <th>Name</th>
            <th>Stream</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.admissionNo}</td>

              <td>
                {student.firstName} {student.lastName}
              </td>

              <td>{student.stream?.name}</td>

              <td>
                <button
                  style={styles.editBtn}
                  onClick={() =>
                    handleEdit(student)
                  }
                >
                  Edit
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() =>
                    handleDelete(student.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
  },

  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "15px",
    marginBottom: "30px",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  button: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    padding: "12px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    background: "#fff",
  },

  editBtn: {
    background: "#f59e0b",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    marginRight: "5px",
    borderRadius: "5px",
    cursor: "pointer",
  },

  deleteBtn: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};