import { create } from "zustand";
import api from "../services/api";

interface AuthState {
  user: { email: string } | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  login: async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    set({ user: res.data.user, token: res.data.token });
  },

  register: async (email, password) => {
    const res = await api.post("/auth/register", { email, password });
    api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
    set({ user: res.data.user, token: res.data.token });
  },

  logout: () => {
    delete api.defaults.headers.common["Authorization"];
    set({ user: null, token: null });
  },
}));
