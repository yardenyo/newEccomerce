import { Roles } from "@/enums";
import { useGetUserQuery } from "@/features/auth/authApiSlice";
import { selectCurrentUser } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type Props = {
  allowedRoles: Roles[];
};

const RequireAuth = ({ allowedRoles }: Props) => {
  const { isLoading, isFetching } = useGetUserQuery(null, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });
  const loading = isLoading || isFetching;
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

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
