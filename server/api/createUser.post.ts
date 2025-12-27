export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const cookie = event.node.req.headers.cookie || "";

  try {
    const res = await $fetch.raw(`${config.apiBase}/user/create`, {
      method: "POST",
      headers: {
        "X-Server-Auth": config.serverSecret,
        "Content-type": "application/json",
        cookie: cookie,
      },
      body: body,
    });
  } catch (err: any) {
    const statusCode = err?.response?.status || 500;
    const laravelData = err?.response?._data;
    throw createError({
      statusCode,
      message: laravelData.message || "Something went wrong",
      data: laravelData?.errors || null,
    });
  }
});
