export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const cookie = event.node.req.headers.cookie || "";

  try {
    const res = await $fetch(`${config.apiBase}/products`, {
      method: "GET",
      headers: {
        "X-Server-Auth": config.serverSecret,
        "Content-Type": "application/json",
        cookie: cookie,
      },
    });
    return res;
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
