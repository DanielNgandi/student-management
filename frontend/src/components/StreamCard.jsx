export default function StreamCard({ stream, onDelete }) {
  return (
    <div style={{
      padding: "10px",
      border: "1px solid #ddd",
      marginBottom: "10px",
      borderRadius: "5px"
    }}>
      <h3>{stream.name}</h3>

      <button onClick={() => onDelete(stream.id)}>
        Delete
      </button>
    </div>
  );
}