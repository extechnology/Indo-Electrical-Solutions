export type CategoryType = "ROOT" | "BRANCH" | "LEAF" | string;


export interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  parent: number | null;
  is_active: boolean;
  category_type: CategoryType;
  full_path: string;
}


export interface BrandBrochure {
  id: number;
  category: number;
  category_name: string;
  title: string | null;
  brochure_file: string;
  is_active: boolean;
}


export interface Brand {
  id: number;
  name: string;
  logo: string | null;
  is_active: boolean;
  brochures: BrandBrochure[];
}


export type AttributeDataType = "text" | "number" | "boolean" | string;

export interface AttributeMaster {
  id: number;
  name: string;
  data_type: AttributeDataType;
  unit: string;
}


export interface ProductAttributeValue {
  id: number;
  attribute: AttributeMaster;

  // value can be string or number depending on backend
  value: string | number | null;

  value_text: string | null;
  value_number: string | null;
  value_bool: boolean | null;
}


export interface ApiProduct {
  id: number;
  name: string;
  slug: string;
  description: string;

  price: string;
  old_price: string | null;

  stock: number;
  is_active: boolean;
  created_at: string;

  min_order_quantity: number;

  is_exclusive: boolean;
  is_featured: boolean;

  rating: number | null;

  image: string | null;

  category: ApiCategory;
  brand: Brand;

  attributes: ProductAttributeValue[];
}


export type ProductsResponse = ApiProduct[];
export type BrandsResponse = Brand[];
export type CategoriesResponse = ApiCategory[];

export type BannerType = "HERO" | "EXCLUSIVE" | "TOP_BRANDS" | "OFFERS";

export const BANNER_TYPE_LABEL: Record<BannerType, string> = {
  HERO: "Hero Carousel",
  EXCLUSIVE: "Exclusive Banner",
  TOP_BRANDS: "Top Brands Banner",
  OFFERS: "Offers Banner",
};


export type HomeBanner = {
  id: number;
  banner_type: BannerType;
  image: string; // backend URL
  title: string;
  description: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};
