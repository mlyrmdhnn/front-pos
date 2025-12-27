export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const incomingCookie = event.node.req.headers.cookie || "";

  if (!incomingCookie.includes("refresh_token")) {
    throw createError({ statusCode: 403, statusMessage: "No refresh token" });
  }

  const res = await $fetch.raw(`${config.apiBase}/refresh`, {
    method: "POST",
    headers: {
      Cookie: incomingCookie, // ✔ harus object dengan key Cookie
    },
  });

  const setCookies = res.headers.getSetCookie();
  if (setCookies?.length) {
    event.node.res.setHeader("set-cookie", setCookies);
  }

  return res._data;
});
