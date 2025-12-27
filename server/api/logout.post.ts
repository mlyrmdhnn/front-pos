export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const cookie = event.node.req.headers.cookie || "";

  const res = await $fetch.raw(`${config.apiBase}/logout`, {
    method: "POST",
    headers: {
      cookie,
    },
  });

  const setCookies = res.headers.getSetCookie();
  if (setCookies?.length) {
    event.node.res.setHeader("set-cookie", setCookies);
  }

  return { message: "logged out" };
});
