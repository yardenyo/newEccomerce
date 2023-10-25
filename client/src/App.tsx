import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import RequireAuth from "@/components/RequireAuth";
import SignUp from "@/components/auth/SignUp";
import SignIn from "@/components/auth/SignIn";
import { Roles } from "@/enums";
import Unauthorized from "@/components/auth/Unauthorized";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="/" element={<div>Home</div>} />
        <Route path="auth/sign-up" element={<SignUp />} />
        <Route path="auth/sign-in" element={<SignIn />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* User Routes */}
        <Route
          element={<RequireAuth allowedRoles={[Roles.USER, Roles.ADMIN]} />}
        >
          <Route path="user-dashboard" element={<div>User Dashboard</div>} />
        </Route>

        {/* Admin Routes */}
        <Route element={<RequireAuth allowedRoles={[Roles.ADMIN]} />}>
          <Route path="admin-dashboard" element={<div>Admin Dashboard</div>} />
        </Route>

        {/* Catch All */}
        <Route path="*" element={<div>404</div>} />
      </Route>
    </Routes>
  );
}

export default App;
