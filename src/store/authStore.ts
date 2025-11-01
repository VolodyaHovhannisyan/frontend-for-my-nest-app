import { create } from "zustand";

interface AuthState {
  user: { email: string } | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  login: async (email, password) => {
    // We'll implement this in Day 10
    console.log("Attempt login with", email, password);
  },

  logout: () => {
    set({ user: null, token: null });
  },
}));
