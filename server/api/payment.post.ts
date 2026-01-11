export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const incomingCookie = event.node.req.headers.cookie || "";
});
