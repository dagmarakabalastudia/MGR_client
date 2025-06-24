import { create } from "zustand";
import { persist } from "zustand/middleware";

export const createAccountStore = create(
  persist(
    (set) => ({
      user: undefined,
      accessToken: undefined,
      setUser: (data) => set({ user: data }),
      setAccessToken: (data) => set({ accessToken: data }),
      logoutUser: () => set({ user: undefined, accessToken: undefined }),
    }),
    { name: "accountStore", getStorage: () => localStorage }
  )
);
