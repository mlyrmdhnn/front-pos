export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const incomingCookie = event.node.req.headers.cookie || "";

  if (!incomingCookie.includes("refresh_token")) {
    throw createError({ statusCode: 403, statusMessage: "No refresh token" });
  }

  try {
    const res = await $fetch.raw(`${config.apiBase}/refresh`, {
      method: "POST",
      headers: {
        Cookie: incomingCookie,
      },
    });

    const setCookies = res.headers.getSetCookie();
    if (setCookies?.length) {
      event.node.res.setHeader("set-cookie", setCookies);
    }
  } catch (err: any) {
    const statusCode = err?.respons?.status || 500;
    const laravelData = err?.response?._data;
    throw createError({
      statusCode,
      message: laravelData?.message || "Something went wrong",
      data: laravelData?.errors || null,
    });
  }
});
