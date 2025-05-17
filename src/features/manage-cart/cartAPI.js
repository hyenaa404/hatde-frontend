export const getCart = () => {
  return axiosInstance.get("/cart", {
    withCredentials: true,
  });
}