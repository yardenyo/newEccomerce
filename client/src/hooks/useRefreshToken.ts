import api from "@/api/Api";
import Helpers from "@/helpers/app.helpers";
import useAuth from "@/hooks/useAuth";
import { AxiosError } from "axios";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refreshToken = async () => {
    try {
      const response = await api.get("/auth/refresh-token", {
        withCredentials: true,
      });
      const { data } = Helpers.handleAxiosSuccess(response);
      setAuth((prev) => {
        return {
          ...prev,
          accessToken: data.accessToken,
        };
      });
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        Helpers.handleAxiosError(e);
      } else {
        console.log(e);
      }
    }
  };

  return refreshToken;
};

export default useRefreshToken;
