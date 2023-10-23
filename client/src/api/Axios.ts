import axios from "axios";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default Axios;
