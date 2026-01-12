import { useToast } from "#imports";
export function useCreateProduct() {
  const { show } = useToast();
  const form = ref({
    name: "",
    price: 0,
    stock: 0,
    category: 0,
    description: "",
  });
  const imageFile = ref<File | null>(null);
  const imagePreview = ref<string | null>(null);

  const handleImage = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      // alert("File harus berupa gambar");
      show("File must be image", "error");
      return;
    }
    imageFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
  };

  const submit = async () => {
    const fd = new FormData();
    fd.append("name", form.value.name);
    fd.append("price", String(form.value.price));
    fd.append("stock", String(form.value.stock));
    fd.append("category", String(form.value.category));
    fd.append("description", form.value.description);
    fd.append("image", imageFile.value);

    try {
      await $fetch("/api/createProduct", {
        method: "POST",
        body: fd,
      });
      show("Success create product", "success");
    } catch {
      show("Failed to create product", "error");
    }
  };

  return { form, submit, handleImage, imagePreview };
}
