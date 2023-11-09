import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import RequireAuth from "@/components/Layout/RequireAuth";
import Home from "@/views/Home";
import Shop from "@/views/Shop";
import SignUp from "@/views/SignUp";
import SignIn from "@/views/SignIn";
import ForgotPassword from "@/views/ForgotPassword";
import ResetPassword from "@/views/ResetPassword";
import Unauthorized from "@/views/Unauthorized";
import AdminDashboard from "@/views/AdminDashboard";
import { Roles } from "@/enums";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";

function App() {
  const [cookies] = useCookies(["isAuthenticated"]);
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = cookies.isAuthenticated || user;

  return (
    <Routes>
      {/* Public Routes */}
      {!isAuthenticated && <Route path="auth/sign-up" element={<SignUp />} />}
      {!isAuthenticated && <Route path="auth/sign-in" element={<SignIn />} />}
      {!isAuthenticated && (
        <Route path="auth/forgot-password" element={<ForgotPassword />} />
      )}
      {!isAuthenticated && (
        <Route path="auth/reset-password/:token" element={<ResetPassword />} />
      )}
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* User Routes */}
        <Route
          element={<RequireAuth allowedRoles={[Roles.USER, Roles.ADMIN]} />}
        >
          <Route path="user-dashboard" element={<div>User Dashboard</div>} />
        </Route>

        {/* Admin Routes */}
        <Route element={<RequireAuth allowedRoles={[Roles.ADMIN]} />}>
          <Route path="admin-dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Catch All */}
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  );
}

export default App;
