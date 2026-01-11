import { api } from "#imports";

export function useCreateProduct() {
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
      alert("File harus berupa gambar");
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

    await $fetch("/api/createProduct", {
      method: "POST",
      body: fd,
    });
  };

  return { form, submit, handleImage, imagePreview };
}
