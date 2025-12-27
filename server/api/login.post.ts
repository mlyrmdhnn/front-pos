export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();

  try {
    const res = await $fetch.raw(`${config.apiBase}/login`, {
      method: "POST",
      body,
    });

    const setCookies = res.headers.getSetCookie();

    if (setCookies?.length) {
      event.node.res.setHeader("set-cookie", setCookies);
    }
  } catch (err: any) {
    const statusCode = err?.response?.status || 500;
    const laravelData = err?.response?._data;
    throw createError({
      statusCode,
      message: laravelData?.message || "Something went wrong",
      data: laravelData?.errors || null,
    });
  }
});
