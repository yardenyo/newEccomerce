import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { Roles } from "@/enums";

type Props = {
  allowedRoles: Roles[];
};

const RequireAuth = ({ allowedRoles }: Props) => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    <>
      {auth?.user && allowedRoles.includes(auth?.user?.role) ? (
        <Outlet />
      ) : auth?.user && !allowedRoles.includes(auth?.user?.role) ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
      ) : (
        <Navigate to="/auth/sign-in" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireAuth;
