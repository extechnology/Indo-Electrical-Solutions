import axiosInstance from "../axios/axiosInstance";

export const getProducts = async () => {
  const res = await axiosInstance.get("/products/");
  return res.data;
};

export const getCategories = async () => {
  const res = await axiosInstance.get("/categories/");
  return res.data;
};

export const getBrands = async () => {
  const res = await axiosInstance.get("/brands/");
  return res.data;
};
