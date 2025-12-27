import { useAuthStore } from "~/store/auth";
export default defineNuxtRouteMiddleware(async (to) => {
  if (process.server) return;

  const auth = useAuthStore();

  if (!auth.user) {
    try {
      const user = await $fetch("/api/me");
      auth.setUser(user);
    } catch {
      return navigateTo("/");
    }
  }

  if (to.meta.role && to.meta.role !== auth.user.role) {
    return navigateTo("/403");
  }
});
