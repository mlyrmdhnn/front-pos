import { getQuery } from "#imports";
export default defineEventHandler(async (event) => {
  const cookie = event.node.req.headers.cookie || "";
  const query = getQuery(event);
  const config = useRuntimeConfig();
  try {
    const res = await $fetch(`${config.apiBase}/product/detail/${query.prd}`, {
      method: "GET",
      headers: {
        "X-Server-Auth": config.serverSecret,
        "Content-type": "application/json",
        cookie,
      },
    });
    return res;
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
