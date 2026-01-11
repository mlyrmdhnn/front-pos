import { usePaymentStore } from "~/store/payment";
export function usePayProduct() {
  const { setPrice } = usePaymentStore();

  type SelectedProduct = {
    id: number;
    name: string;
    price: number;
    totalItem: number;
  };

  const selectedProducts = ref<SelectedProduct[]>([]);

  const priceTotal = computed(() =>
    selectedProducts.value.reduce((sum, p) => sum + p.price * p.totalItem, 0)
  );

  const setProductSelected = (data: {
    id: number;
    name: string;
    price: number;
  }) => {
    if (selectedProducts.value.some((p) => p.id === data.id)) return;

    selectedProducts.value.push({
      id: data.id,
      name: data.name,
      price: data.price,
      totalItem: 1,
    });
    setPrice(priceTotal.value);
  };

  const increaseItem = (id: number) => {
    const product = selectedProducts.value.find((p) => p.id === id);
    if (!product) return;

    product.totalItem++;
    setPrice(priceTotal.value);
  };

  const decreaseItem = (id: number) => {
    const product = selectedProducts.value.find((p) => p.id === id);
    if (!product) return;

    if (product.totalItem === 1) {
      selectedProducts.value = selectedProducts.value.filter(
        (p) => p.id !== id
      );
    } else {
      product.totalItem--;
    }

    setPrice(priceTotal.value);
  };

  const payCash = () => {};

  return {
    selectedProducts,
    priceTotal,
    setProductSelected,
    increaseItem,
    decreaseItem,
  };
}
