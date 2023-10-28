import { Link } from "react-router-dom";
import Users from "@/components/Users";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";

const AdminDashboard = () => {
  const user = useSelector(selectCurrentUser);
  return (
    <section>
      <h1>
        Admin Dashboard - {user?.firstName} {user?.lastName}
      </h1>
      <br />
      <Users />
      <br />
      <Link to="/">Home</Link>
    </section>
  );
};

export default AdminDashboard;
