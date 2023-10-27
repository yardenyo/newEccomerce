import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { Roles } from "@/enums";

type Props = {
  allowedRoles: Roles[];
};

const RequireAuth = ({ allowedRoles }: Props) => {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  return (
    <>
      {user && allowedRoles.includes(user?.role) ? (
        <Outlet />
      ) : user && !allowedRoles.includes(user?.role) ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
      ) : (
        <Navigate to="/auth/sign-in" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireAuth;
