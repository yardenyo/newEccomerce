import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import RequireAuth from "@/components/RequireAuth";
import Home from "@/components/Home";
import SignUp from "@/components/auth/SignUp";
import SignIn from "@/components/auth/SignIn";
import ForgotPassword from "@/components/auth/ForgotPassword";
import ResetPassword from "@/components/auth/ResetPassword";
import Unauthorized from "@/components/auth/Unauthorized";
import AdminDashboard from "@/components/AdminDashboard";
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
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        {!isAuthenticated && <Route path="auth/sign-up" element={<SignUp />} />}
        {!isAuthenticated && <Route path="auth/sign-in" element={<SignIn />} />}
        {!isAuthenticated && (
          <Route path="auth/forgot-password" element={<ForgotPassword />} />
        )}
        {!isAuthenticated && (
          <Route
            path="auth/reset-password/:token"
            element={<ResetPassword />}
          />
        )}
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
