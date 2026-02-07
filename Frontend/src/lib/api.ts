
import axios from "axios";
import process from "process";

const url = process.env.API_URL || "http://localhost:5000/api"

const api = axios.create({
  baseURL: `${url}/notes`, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;