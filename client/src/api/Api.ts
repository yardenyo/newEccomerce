import Axios from "axios";
import type { AxiosInstance } from "axios";
import AxiosMiddleware from "@/helpers/axiosMiddleware.helpers";

const config = {
  baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

const axios: AxiosInstance = Axios.create(config);

axios.interceptors.request.use(
  AxiosMiddleware.requestFulfilled,
  AxiosMiddleware.requestRejected
);
axios.interceptors.response.use(
  AxiosMiddleware.responseFulfilled,
  AxiosMiddleware.responseRejected
);

export default axios;
