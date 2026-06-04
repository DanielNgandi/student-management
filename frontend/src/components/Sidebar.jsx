import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div>
      <h2>Menu</h2>

      <ul style={{ listStyle: "none" }}>
        <li><Link to="/streams">Streams</Link></li>
        <li><Link to="/students">Students</Link></li>
        <li><Link to="/subjects">Subjects</Link></li>
        <li><Link to="/scores">Scores</Link></li>
        <li><Link to="/reports">Reports</Link></li>
      </ul>
    </div>
  );
}