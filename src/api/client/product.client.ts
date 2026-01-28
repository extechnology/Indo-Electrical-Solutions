import axiosInstance from "../axios/axiosInstance";

export const getProducts = async () => {
  const res = await axiosInstance.get("/api/products/");
  return res.data;
};

export const getCategories = async () => {
  const res = await axiosInstance.get("/api/categories/");
  return res.data;
};

export const getBrands = async () => {
  const res = await axiosInstance.get("/api/brands/");
  return res.data;
};


export const getBanners = async () => {
  const res = await axiosInstance.get("/api/home-banner/");
  return res.data;
};


export const getLatestLaunches = async () => {
  const res = await axiosInstance.get("/api/latest-launches/");
  return res.data;
};


export const getOffersAndSchemes = async () => {
  const res = await axiosInstance.get("/api/offers-and-schemes/");
  return res.data;
};