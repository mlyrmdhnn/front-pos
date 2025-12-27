// export default defineNuxtPlugin(async () => {
//   const authState = useAuthState();

//   if (authState.value) return;

//   try {
//     const user = await $fetch("/api/me");
//     authState.value = user;
//   } catch {
//     authState.value = null;
//   }
// });

export default defineNuxtPlugin(async () => {});
