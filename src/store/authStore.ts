import { create } from "zustand";
import api from "../services/api";
import { persist } from "zustand/middleware";

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
  checkAuth: () => void
  loading: boolean
  setToken: (token: string | null) => void;

}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: JSON.parse(localStorage.getItem("user") || "null"),
      token: localStorage.getItem("token"),
      loading: false,

      setToken: (token) => {
        if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        else delete api.defaults.headers.common["Authorization"];
        set({ token });
      },

      // login: async (email, password) => {
      //   set({ loading: true })
       
      //   const res = await api.post("/auth/login", { email, password });
      //   const { token, user } = res.data;
      //   api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      //   set({ user, token, loading: false });
      // },

      async login(email, password) {
        const res = await api.post("/auth/login", { email, password });
        const { accessToken } = res.data;
        set({ token: accessToken });
        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      },

      register: async (email, password) => {
        const res = await api.post("/auth/register", { email, password });
        const { token, user } = res.data;
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        set({ token, user });
      },

      // logout: () => {
      //   set({ token: null, user: null });
      //   delete api.defaults.headers.common["Authorization"];
      //   localStorage.removeItem("auth-storage");
      // },

      async logout() {
        await api.post("/auth/logout");
        set({ token: null, user: null });
      },

      checkAuth: async () => {
        const { token } = get();
        if (!token) return;
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
          const res = await api.get("/auth/me");
          set({ user: res.data });
        } catch {
          get().logout();
        }

      },

      isAdmin: () => get().user?.role === 'ADMIN',

    })
    , {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token, user: state.user
      })
    }
  )
);
