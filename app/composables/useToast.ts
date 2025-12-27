type ToastType = "success" | "error" | "info";

type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

export function useToast() {
  const toasts = useState<Toast[]>("toasts", () => []);

  const show = (
    message: string,
    type: ToastType = "success",
    duration = 3000
  ) => {
    const id = Date.now();

    toasts.value.push({ id, message, type });

    setTimeout(() => {
      toasts.value = toasts.value.filter((t) => t.id !== id);
    }, duration);
  };

  return { toasts, show };
}
