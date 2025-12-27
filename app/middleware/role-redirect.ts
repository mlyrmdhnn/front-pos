import { useAuthStore } from "~/store/auth";
export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore();

  if (!auth.isLoggedIn) {
    return navigateTo("/");
  }

  switch (auth.role) {
    case "super_admin": 
      return navigateTo("/dashboard/owner-dashboard");
    case "manager":
      return navigateTo("/owner");
    case "user":
      return navigateTo("/home");
    default:
      return navigateTo("/403");
  }
});
