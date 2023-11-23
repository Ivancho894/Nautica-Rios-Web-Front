import { Link } from "react-router-dom";
export default function DashboardWrapper({ children }) {
  return (
    <div>
      <nav>
        <div>logotipo</div>
        <Link to="/dashboard">post</Link>
        <Link to="/dashboard/profile">profile</Link>
        <Link to="/signout">signout</Link>
      </nav>
      <div>{children}</div>
    </div>
  );
}
