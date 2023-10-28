import React from "react";
import { useCookies } from "react-cookie";
import { useGetUserQuery } from "@/features/auth/authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";

type Props = {
  children: React.ReactElement;
};

const AuthMiddleware = ({ children }: Props) => {
  const [cookies] = useCookies(["isAuthenticated"]);
  const user = useSelector(selectCurrentUser);
  const { isLoading, isFetching } = useGetUserQuery(null, {
    skip: !cookies.isAuthenticated,
    refetchOnMountOrArgChange: true,
  });
  const loading = isLoading || isFetching;

  if (loading) return <div>Loading...</div>;

  if (!user && cookies.isAuthenticated) return <div>Loading...</div>;

  return <>{children}</>;
};

export default AuthMiddleware;
