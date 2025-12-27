// import { useGenAi } from "../utils/genai";
import { useGenAi } from "#imports";
import { SYSTEM_RULES } from "./rules";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const genAI = useGenAi();

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: SYSTEM_RULES,
  });

  const result = await model.generateContent(body.prompt);

  const rawText = result.response.text();

  const cleaned = rawText
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  let parsed;

  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    return {
      status: "error",
      msg: "invalid_ai_response",
      data: [{ text: "AI mengembalikan format tidak valid." }],
      raw: rawText,
    };
  }

  return parsed;
});
