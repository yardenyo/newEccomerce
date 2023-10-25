import Axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL || "http://localhost:5000/api";

export default Axios.create({
  baseURL,
});

export const axiosPrivate = Axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
