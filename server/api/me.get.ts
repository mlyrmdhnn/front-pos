export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const incomingCookie = event.node.req.headers.cookie || "";

  const fetchMe = (cookie: string) =>
    $fetch(`${config.apiBase}/me`, {
      headers: { cookie },
    });

  try {
    return await fetchMe(incomingCookie);
  } catch (err: any) {
    if (err?.status === 422) {
      try {
        const refresh = await $fetch.raw(`${config.apiBase}/refresh`, {
          method: "POST",
          headers: { cookie: incomingCookie },
        });
        const setCookies = refresh.headers.getSetCookie();
        if (!setCookies?.length) {
          throw new Error("No refresh cookie");
        }
        event.node.res.setHeader("set-cookie", setCookies);
        const mergedCookie = setCookies.map((c) => c.split(";")[0]).join("; ");
        return await fetchMe(mergedCookie);
      } catch {
        throw createError({
          statusCode: 401,
          statusMessage: "Unauthenticated",
        });
      }
    }

    throw createError({
      statusCode: err.status || 403,
      statusMessage: err.data?.message || "Forbidden",
    });
  }
});
