export function productService() {
  const getProductApi = async () => {
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
  return { getProductApi, getProductCategoryApi };
}
