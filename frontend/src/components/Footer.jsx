export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>
        © {new Date().getFullYear()} IKONEX School Management System
      </p>

      <p>Version 1.0</p>
    </footer>
  );
}

const styles = {
  footer: {
    marginTop: "40px",
    padding: "15px",
    background: "#fff",
    borderTop: "1px solid #ddd",
    textAlign: "center",
    color: "#64748b",
  },
};