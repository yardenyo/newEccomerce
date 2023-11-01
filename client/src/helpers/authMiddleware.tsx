import React from "react";
import { useCookies } from "react-cookie";
import { useGetUserQuery } from "@/features/auth/authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/features/auth/authSlice";
import Loading from "@/components/Loading";

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

  if (loading) return <Loading />;

  if (!user && cookies.isAuthenticated) return <Loading />;

  return <>{children}</>;
};

export default AuthMiddleware;
