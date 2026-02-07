
import axios from "axios";



const url = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

const api = axios.create({
  baseURL: `${url}/notes`, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;