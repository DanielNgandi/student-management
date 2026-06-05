import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);

      if (window.innerWidth > 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div style={styles.container}>
      {/* MOBILE TOPBAR */}
      {isMobile && (
        <div style={styles.topbar}>
          <button
            onClick={() => setOpen(!open)}
            style={styles.menuBtn}
          >
            ☰
          </button>

          <h3 style={{ margin: 0 }}>IKONEX SYSTEM</h3>
        </div>
      )}

      {/* SIDEBAR */}
      <aside
        style={{
          ...styles.sidebar,
          transform:
            open || !isMobile
              ? "translateX(0)"
              : "translateX(-100%)",
        }}
      >
        <h2 style={styles.logo}>IKONEX</h2>

        <NavLink
          to="/"
          style={styles.link}
          onClick={() => setOpen(false)}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/students"
          style={styles.link}
          onClick={() => setOpen(false)}
        >
          Students
        </NavLink>

        <NavLink
          to="/streams"
          style={styles.link}
          onClick={() => setOpen(false)}
        >
          Streams
        </NavLink>

        <NavLink
          to="/subjects"
          style={styles.link}
          onClick={() => setOpen(false)}
        >
          Subjects
        </NavLink>

        <NavLink
          to="/scores"
          style={styles.link}
          onClick={() => setOpen(false)}
        >
          Scores
        </NavLink>

        <NavLink
          to="/reports"
          style={styles.link}
          onClick={() => setOpen(false)}
        >
          Reports
        </NavLink>
      </aside>

      {/* MOBILE OVERLAY */}
      {open && isMobile && (
        <div
          style={styles.overlay}
          onClick={() => setOpen(false)}
        />
      )}

      {/* MAIN SECTION */}
      <main
        style={{
          ...styles.main,
          marginLeft: isMobile ? 0 : 250,
        }}
      >
        <Header onMenuClick={() => setOpen(!open)} />

        <div style={styles.content}>
          <Outlet />
        </div>

        <Footer />
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

  topbar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "60px",
    background: "#1e293b",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "0 15px",
    zIndex: 1200,
  },

  menuBtn: {
    fontSize: "24px",
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },

  sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "250px",
    height: "100vh",
    background: "#1e293b",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    transition: "transform 0.3s ease",
    zIndex: 1300,
    boxSizing: "border-box",
  },

  logo: {
    textAlign: "center",
    marginBottom: "20px",
  },

  link: {
    textDecoration: "none",
    color: "#fff",
    padding: "12px",
    borderRadius: "8px",
    background: "#334155",
    fontWeight: "500",
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    width: "100%",
    boxSizing: "border-box",
  },

  content: {
    flex: 1,
    padding: "20px",
    marginTop: "10px",
    overflowX: "auto",
  },

  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    zIndex: 1250,
  },
};