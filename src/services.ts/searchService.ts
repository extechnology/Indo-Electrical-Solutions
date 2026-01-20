import axiosInstance from "../api/axios/axiosInstance";

export type SearchProduct = {
  id: number;
  name: string;
  slug: string;
  image: string | null;
  price: string;
  old_price: string | null;
  brand: { id: number; name: string; logo: string | null } | null;
  leaf_category: {
    id: number;
    name: string;
    slug: string;
    full_path?: string | null;
  } | null;
};

export type SearchCategory = {
  id: number;
  name: string;
  slug: string;
  category_type: "MAIN" | "SUB" | "LEAF";
  full_path?: string | null;
  leaf_slugs?: string[];
};

export type SearchBrand = {
  id: number;
  name: string;
  logo: string | null;
};

export type SearchResponse = {
  query: string;
  products: SearchProduct[];
  brands: SearchBrand[];
  categories: {
    main: SearchCategory[];
    sub: SearchCategory[];
    leaf: SearchCategory[];
  };
};

export const searchAll = async (q: string): Promise<SearchResponse> => {
  const res = await axiosInstance.get(`/search/`, {
    params: { q },
  });
  return res.data;
};
