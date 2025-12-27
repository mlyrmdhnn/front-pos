import { productService } from "~/services/product/product.services";

type Category = {
  id: number;
  name: string;
};
const { getProductApi, getProductCategoryApi } = productService();
export function useProduct() {
  const dataProduct = ref<any>([]);
  const getProduct = async () => {
    try {
      const res = await getProductApi();
      dataProduct.value = res.data;
    } catch (e: any) {}
  };
  const productCategory = ref<Category[]>([]);
  const getCategory = async () => {
    const res = await getProductCategoryApi();
    productCategory.value = res.data;
  };
  return { dataProduct, getProduct, productCategory, getCategory };
}
