import { productService } from "~/services/product/product.services";

type Category = {
  id: number;
  name: string;
};

export function useProduct() {
  const { getProductApi, getProductCategoryApi, createProductApi } =
    productService();
  const dataProduct = ref<any>([]);
  const meta = ref({
    current_page: 1,
    last_page: 1,
    total: 0,
  });

  const getProduct = async (page = 1) => {
    try {
      const res: any = await $fetch("/api/products", {
        query: { page },
      });
      const pagination = res[0];

      dataProduct.value = pagination.data;
      meta.value = {
        current_page: pagination.current_page,
        last_page: pagination.last_page,
        total: pagination.total,
      };
    } catch (e: any) {}
  };

  const productCategory = ref<Category[]>([]);

  const getCategory = async () => {
    if (process.server) return;
    const res = await getProductCategoryApi();
    productCategory.value = res.data;
  };

  const detailProduct = () => {
    navigateTo("/product-detail");
  };

  return {
    dataProduct,
    getProduct,
    productCategory,
    getCategory,
    meta,
    detailProduct,
  };
}
