export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const cookie = event.node.req.headers.cookie || "";
  const body = await readBody(event);
  try {
    const res = $fetch(`${config.apiBase}/product/delete`, {
      method: "POST",
      headers: {
        "X-Server-Auth": config.serverSecret,
        "Content-type": "application/json",
        cookie,
      },
      body,
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
