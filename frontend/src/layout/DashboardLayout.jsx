import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div style={styles.container}>
      {/* MOBILE TOP BAR */}
      <div style={styles.topbar}>
        <button onClick={() => setOpen(!open)} style={styles.menuBtn}>
          ☰
        </button>

        <h3 style={{ margin: 0 }}>IKONEX SYSTEM</h3>
      </div>

      {/* SIDEBAR */}
      <aside
        style={{
          ...styles.sidebar,
          transform:
            open || window.innerWidth > 768
              ? "translateX(0)"
              : "translateX(-100%)",
        }}
      >
        <h2 style={styles.logo}>IKONEX</h2>

        <NavLink to="/" style={styles.link} onClick={() => setOpen(false)}>
          Dashboard
        </NavLink>

        <NavLink to="/streams" style={styles.link} onClick={() => setOpen(false)}>
          Streams
        </NavLink>

        <NavLink to="/students" style={styles.link} onClick={() => setOpen(false)}>
          Students
        </NavLink>

        <NavLink to="/subjects" style={styles.link} onClick={() => setOpen(false)}>
          Subjects
        </NavLink>

        <NavLink to="/scores" style={styles.link} onClick={() => setOpen(false)}>
          Scores
        </NavLink>

        <NavLink to="/reports" style={styles.link} onClick={() => setOpen(false)}>
          Reports
        </NavLink>
      </aside>

      {/* OVERLAY (mobile only) */}
      {open && (
        <div style={styles.overlay} onClick={() => setOpen(false)} />
      )}

      {/* MAIN CONTENT */}
      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#f5f7fb",
  },

  /* TOP BAR (mobile) */
  topbar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "55px",
    background: "#1e293b",
    color: "white",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "0 15px",
    zIndex: 1000,
  },

  menuBtn: {
    fontSize: "22px",
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
  },

  /* SIDEBAR */
  sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
    width: "250px",
    background: "#1e293b",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    transition: "0.3s",
    zIndex: 1100,
  },

  logo: {
    marginBottom: "20px",
    textAlign: "center",
  },

  link: {
    textDecoration: "none",
    color: "#fff",
    padding: "12px",
    borderRadius: "8px",
    background: "#334155",
  },

  /* MAIN CONTENT */
  main: {
    flex: 1,
    marginLeft: "250px",
    padding: "80px 20px 20px",
  },

  /* MOBILE OVERLAY */
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    zIndex: 1000,
  },
};