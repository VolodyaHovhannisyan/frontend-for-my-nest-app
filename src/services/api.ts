import axios from "axios";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  withCredentials: true, // send cookies
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        return
        const res = await api.post("/auth/refresh");
        const { accessToken } = res.data;
        const { setToken } = useAuthStore.getState();
        setToken(accessToken);
        original.headers["Authorization"] = `Bearer ${accessToken}`;
        return api(original);
      } catch (err) {
        console.log(err);
        
        const { logout } = useAuthStore.getState();
        logout();
      }
    }
    return Promise.reject(error);
  }
);

export default api;
