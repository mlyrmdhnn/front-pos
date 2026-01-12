import { productService } from "~/services/product/product.services";

type Category = {
  id: number;
  name: string;
};

export function useProduct() {
  const isLoading = ref(false);
  const isLoadingMsg = ref(false);
  const route = useRoute();
  const {
    getProductApi,
    getProductCategoryApi,
    createProductApi,
    deleteProductApi,
  } = productService();

  const dataProduct = ref<any>([]);
  const meta = ref({
    current_page: 1,
    last_page: 1,
    total: 0,
  });

  const getProduct = async (page = 1) => {
    isLoading.value = true;
    dataProduct.value = "";
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
    } catch (e: any) {
    } finally {
      isLoading.value = false;
    }
  };

  const productCategory = ref<Category[]>([]);

  const getCategory = async () => {
    if (process.server) return;
    const res = await getProductCategoryApi();
    productCategory.value = res.data;
  };

  const detailProduct = (id: string) => {
    navigateTo(`/product-detail?prd=${id}`);
  };

  const productDetail = ref([]);
  const getDetailProduct = async () => {
    isLoading.value = true;
    try {
      const query = route.query;
      const res = await $fetch(`/api/detailProduct?prd=${query.prd}`, {
        method: "GET",
      });
      productDetail.value = res.data;
    } catch {
    } finally {
      isLoading.value = false;
    }
  };

  const deleteProduct = async (uuid: string) => {
    isLoadingMsg.value = true;
    try {
      await deleteProductApi({ uuid });
    } finally {
      isLoadingMsg.value = false;
      navigateTo("/owner/pos");
    }
  };

  const getProdyctBycategory = async (id = 1) => {
    isLoading.value = true;
    try {
      dataProduct.value = "";
      const res = await $fetch("/api/products/byCategory", {
        query: { id },
      });
      dataProduct.value = res;
    } catch (err: any) {
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    dataProduct,
    getProduct,
    productCategory,
    getCategory,
    meta,
    detailProduct,
    getDetailProduct,
    productDetail,
    deleteProduct,
    isLoadingMsg,
    getProdyctBycategory,
  };
}
