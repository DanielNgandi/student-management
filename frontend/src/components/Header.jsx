import { useState } from "react";
import { IconButton, InputBase, Paper, Avatar, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";

export default function Header({ onMenuClick }) {
  const [search, setSearch] = useState("");

  return (
    <div style={styles.header}>
      {/* LEFT */}
      <div style={styles.left}>
        <IconButton onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>

        <h2 style={styles.logo}>IKONEX</h2>
      </div>

      {/* SEARCH */}
      <Paper component="form" style={styles.searchBox}>
        <SearchIcon style={{ marginLeft: 10 }} />
        <InputBase
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ marginLeft: 10, flex: 1 }}
        />
      </Paper>

      {/* RIGHT */}
      <div style={styles.right}>
        <IconButton>
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <IconButton>
          <Avatar sx={{ width: 32, height: 32 }}>
            A
          </Avatar>
        </IconButton>
      </div>
    </div>
  );
}

const styles = {
  header: {
    height: "65px",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 15px",
    borderBottom: "1px solid #e5e7eb",
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
    fontSize: "18px",
  },

  searchBox: {
    display: "flex",
    alignItems: "center",
    width: "40%",
    padding: "2px 10px",
    boxShadow: "none",
    border: "1px solid #e5e7eb",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
};