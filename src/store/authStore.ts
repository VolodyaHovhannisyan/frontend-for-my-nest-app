import { create } from "zustand";
import api from "../services/api";

interface User {
  id: number
  email: string
  role: 'USER' | 'ADMIN'
}

interface AuthState {
  user: User | null
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean
  loading: boolean
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),
  loading: false,

  login: async (email, password) => {
    set({ loading: true })

    const res = await api.post("/auth/login", { email, password });

    const { token, user } = res.data

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem('token', token)
    set({ user, token, loading: false });
  },

  register: async (email, password) => {
    const res = await api.post("/auth/register", { email, password });
    api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", res.data.token);
    set({ user: res.data.user, token: res.data.token });
  },

  logout: () => {
    localStorage.clear();
    delete api.defaults.headers.common["Authorization"];
    set({ user: null, token: null });
  },

  isAdmin: () => get().user?.role === 'ADMIN',

}));
