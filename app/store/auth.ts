import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as null | {
      id: number;
      name: string;
      role: string;
      phone: string;
      username: string;
      data: any;
    },
  }),

  getters: {
    isLoggedIn: (state) => !!state.user,
    role: (state) => state.user?.role,
  },

  actions: {
    setUser(user: any) {
      this.user = user;
    },
    clear() {
      this.user = null;
    },
  },
});
