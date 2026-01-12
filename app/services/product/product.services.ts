export function productService() {
  const getProductApi = async (page = 1) => {
    return $fetch("/api/products", {
      credentials: "include",
      method: "GET",
    });
  };
  const getProductCategoryApi = async () => {
    return $fetch("/api/productCategory", {
      credentials: "include",
      method: "GET",
    });
  };
  const createProductApi = async (payload: {
    name: string;
    price: number;
    stock: number;
    category: number;
    description: string;
  }) => {
    return $fetch("/api/createProduct", {
      method: "POST",
      credentials: "include",
      body: payload,
    });
  };

  const deleteProductApi = (payload: { uuid: string }) => {
    return $fetch("/api/deleteProduct", {
      method: "POST",
      body: payload,
    });
  };
  return {
    getProductApi,
    getProductCategoryApi,
    createProductApi,
    deleteProductApi,
  };
}
