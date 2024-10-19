import { create } from "zustand";

interface AuthState {
  status: "authenticated" | "unauthenticated" | "checking";
  token?: string;
  user?: {
    name: string;
    email: string;
  };

  // métodos en zustand: son las acciones
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  status: "checking",
  token: undefined,
  user: undefined,

  // acciones
  login: (email: string, password: string) => {
    set({
      status: "authenticated",
      token: "token_from_server",
      user: { name: "John Doe", email }
    });
  },

  logout: () => {
    set({
      status: "unauthenticated",
      token: undefined,
      user: undefined
    });
  }
}));
