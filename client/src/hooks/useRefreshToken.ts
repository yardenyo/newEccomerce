import authApi from "@/api/auth.api";
import useAuth from "@/hooks/useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refreshToken = async () => {
    try {
      const { data } = await authApi.refreshToken();
      setAuth((prev) => {
        return {
          ...prev,
          accessToken: data.accessToken,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  return refreshToken;
};

export default useRefreshToken;
