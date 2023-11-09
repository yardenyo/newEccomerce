import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";

const AdminDashboard = () => {
  const user = useSelector(selectCurrentUser);
  return (
    <section className="bg-white dark:bg-black dark:text-white">
      <h1>
        Admin Dashboard - {user?.firstName} {user?.lastName}
      </h1>
      <br />
      <Link to="/">Home</Link>
    </section>
  );
};

export default AdminDashboard;
