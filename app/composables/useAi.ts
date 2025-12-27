import { aiApi } from "~/services/ai/ai.services";
export function useAi() {
  type AiListItem = {
    text: string;
  };

  type AiDataItem = {
    text: string;
    list?: AiListItem[];
  };

  type ApiResult = {
    status: "ok" | "error";
    msg: string;
    type: "user" | "ai";
    data: AiDataItem[];
  };
  const prompt = ref<string>("");
  const isLoading = ref<boolean>(false);
  const isDisabled = ref<boolean>(false);
  const result = ref<ApiResult[]>([
    {
      data: [{ text: "Halo, siapa kamu?" }],
      status: "ok",
      msg: "success",
      type: "user",
    },
    {
      status: "ok",
      msg: "success",
      type: "ai",
      data: [{ text: "Halo, saya adalah AI Assistant POS." }],
    },
    {
      data: [{ text: "Fitur apa saja yg ada di sini?" }],
      status: "ok",
      msg: "success",
      type: "user",
    },
    {
      status: "ok",
      msg: "success",
      type: "ai",
      data: [
        {
          text: "Berikut beberapa fitur POS:",
          list: [
            { text: "Manajemen produk" },
            { text: "Transaksi penjualan" },
            { text: "Laporan penjualan" },
          ],
        },
        {
          text: "Apakah ada yang ingin ditanyakan lagi?",
        },
      ],
    },
    {
      data: [{ text: "Cukup, itu saja" }],
      status: "ok",
      msg: "success",
      type: "user",
    },
    {
      status: "ok",
      msg: "success",
      type: "ai",
      data: [{ text: "Baik, senang membantu anda." }],
    },
  ]);
  const askAI = async () => {
    isLoading.value = true;
    result.value.push({
      data: [{ text: prompt.value }],
      status: "ok",
      msg: "success",
      type: "user",
    });
    try {
      const res = await aiApi(prompt.value);
      result.value.push(res);
    } catch {
      result.value.push({
        status: "error",
        msg: "ai_error",
        type: "ai",
        data: [{ text: "Terjadi kesalahan saat memproses permintaan." }],
      });
    } finally {
      isLoading.value = false;
      prompt.value = "";
    }
  };
  watch(
    prompt,
    () => {
      if (prompt.value.length == 0) {
        isDisabled.value = true;
      } else {
        isDisabled.value = false;
      }
    },
    { immediate: true }
  );
  return { prompt, result, askAI, isLoading, isDisabled };
}
