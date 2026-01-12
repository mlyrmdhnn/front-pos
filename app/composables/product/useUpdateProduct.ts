import { useToast } from "#imports";
import { useCreateProduct } from "./useCreateProduct";
import { useProduct } from "./useProducts";

export function useUpdateProduct() {
  const { productDetail } = useProduct();
  const { form } = useCreateProduct();
  const isLoadingMsg = ref(false);
  const { show } = useToast();
  const formUpdate = ref({
    id: 0,
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
      show("File must be image", "error");
      return;
    }
    imageFile.value = file;
    imagePreview.value = URL.createObjectURL(file);
  };
  const submit = async () => {
    const fd = new FormData();

    fd.append("id", String(formUpdate.value.id));
    fd.append("name", formUpdate.value.name);
    fd.append("price", String(formUpdate.value.price));
    fd.append("quantity", String(formUpdate.value.stock));
    fd.append("category", String(formUpdate.value.category));
    fd.append("description", formUpdate.value.description ?? "");

    if (imageFile.value) {
      fd.append("image", imageFile.value);
    }

    try {
      isLoadingMsg.value = true;
      await $fetch("/api/updateProduct", {
        method: "POST",
        body: fd,
      });
      show("Success update product", "success");
    } catch (e) {
      show("Failed to update product", "error");
    } finally {
      isLoadingMsg.value = false;
    }
  };

  return { handleImage, submit, imagePreview, formUpdate, isLoadingMsg };
}
