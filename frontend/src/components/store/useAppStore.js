import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAppStore = create(
  persist(
    (set) => ({
      login: false,
      setLogin: (login) => set({ login }),
      user: null,
      setUser: (user) => set({ user }),
      token: null,
      setToken: (token) => set({ token, login: true }),
      base_url: "http://127.0.0.1:8000/api/",
      open: false,
      setOpen: (open) => set({open}),
    }),
    {
      name: "app-storage",
    }
  )
);

export default useAppStore;
