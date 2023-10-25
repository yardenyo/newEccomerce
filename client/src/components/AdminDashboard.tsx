import { Link } from "react-router-dom";
import Users from "@/components/Users";

const AdminDashboard = () => {
  return (
    <section>
      <h1>Admin Dashboard</h1>
      <br />
      <Users />
      <br />
      <Link to="/">Home</Link>
    </section>
  );
};

export default AdminDashboard;
