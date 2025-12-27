import { GoogleGenerativeAI } from "@google/generative-ai";

export const useGenAi = () => {
  const config = useRuntimeConfig();
  return new GoogleGenerativeAI(config.geminiKey);
};
