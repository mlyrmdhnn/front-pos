export function useMe() {
  const user = ref();
  const getMe = async () => {
    try {
      const data = await $fetch("/api/me");
      user.value = data;
    } catch {}
  };
  getMe();
  return { user, getMe };
}
