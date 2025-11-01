import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // your Nest.js backend
});

export default api;
