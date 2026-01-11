export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const cookie = getHeader(event, "cookie") || "";

  const parts = await readMultipartFormData(event);
  const fd = new FormData();

  for (const part of parts) {
    if (part.filename) {
      fd.append(
        part.name,
        new Blob([part.data], { type: part.type }),
        part.filename
      );
    } else {
      fd.append(part.name, part.data.toString());
    }
  }

  return await $fetch(`${config.apiBase}/product/create`, {
    method: "POST",
    headers: {
      "x-server-auth": config.serverSecret,
      cookie,
    },
    body: fd,
  });
});
