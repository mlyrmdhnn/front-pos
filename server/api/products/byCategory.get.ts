export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const cookie = event.node.req.headers.cookie || "";
  const query = getQuery(event);

  try {
    const res = await $fetch(`${config.apiBase}/products/category`, {
      query,
      method: "GET",
      headers: {
        cookie: cookie,
        "X-Server-Auth": config.serverSecret,
      },
    });
    return res;
  } catch (err: any) {
    const statusCode = err?.response?.status || 500;
    const laravelData = err?.response?._data;

    throw createError({
      statusCode,
      message: laravelData?.message || "Seomething went wrong",
      data: laravelData?.errors || null,
    });
  }
});
