export const aiApi = (payload: string) => {
  return $fetch("/api/gemini", {
    method: "POST",
    body: { prompt: payload },
  });
};
