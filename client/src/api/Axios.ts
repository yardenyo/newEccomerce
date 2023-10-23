import axios from "axios";

const Axios = axios.create({
  baseURL:
    (import.meta.env.VITE_CLIENT_URL as string) || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;
