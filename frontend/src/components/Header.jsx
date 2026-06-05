import { useState } from "react";

export default function Header({ onMenuClick }) {
  const [search, setSearch] = useState("");

  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <button onClick={onMenuClick} style={styles.menuBtn}>
          ☰
        </button>

        <h2 style={styles.logo}>IKONEX</h2>
      </div>

      <div style={styles.center}>
        <input
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.search}
        />
      </div>

      <div style={styles.right}>
        <button style={styles.icon}>🔔</button>
        <button style={styles.icon}>👤</button>
      </div>
    </header>
  );
}

const styles = {
  header: {
    height: "65px",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    borderBottom: "1px solid #ddd",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  logo: {
    margin: 0,
    color: "#1e293b",
  },

  center: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },

  search: {
    width: "100%",
    maxWidth: "400px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  right: {
    display: "flex",
    gap: "10px",
  },

  menuBtn: {
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "22px",
  },

  icon: {
    border: "none",
    background: "#f1f5f9",
    padding: "10px",
    borderRadius: "50%",
    cursor: "pointer",
  },
};