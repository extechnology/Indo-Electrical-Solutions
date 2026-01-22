import React, { useMemo, useState, useEffect } from "react";
import { useProducts } from "../hooks/useProducts";
import { useParams } from "react-router-dom";
import { useBrands } from "../hooks/useBrands";

type DeliveryMode = "Home Delivery" | "Store Pickup";
type SortMode =
  | "Relevance"
  | "Price: Low to High"
  | "Price: High to Low"
  | "Rating"
  | "Newest";

type ApiCategory = {
  id: number;
  name: string;
  slug: string;
  parent: number | null;
  is_active: boolean;
  category_type?: string;
  full_path?: string;
};

type ApiBrand = {
  id: number;
  name: string;
  logo?: string;
  is_active: boolean;
};

type ApiProduct = {
  id: number;
  name: string;
  slug: string;
  description?: string;

  price: string; 
  old_price?: string | null;

  is_exclusive: boolean;
  min_order_quantity: number;

  stock: number;
  is_active: boolean;
  created_at: string;

  image?: string | null;

  category: ApiCategory;
  brand: ApiBrand;

  attributes?: any[];
};

const formatINR = (value: number) =>
  value.toLocaleString("en-IN", { maximumFractionDigits: 0 });

const calcDiscountPercent = (oldPrice?: number, price?: number) => {
  if (!oldPrice || !price) return null;
  if (oldPrice <= price) return null;
  const p = Math.round(((oldPrice - price) / oldPrice) * 100);
  return p > 0 ? p : null;
};

const FilterPage: React.FC = () => {
  const { category } = useParams(); // ✅ slug from route
  const { data: productss, isLoading: productsLoading } = useProducts();
  const { data: brands, isLoading: brandsLoading } = useBrands();

  // ✅ Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>("All"); // category slug
  const [selectedBrand, setSelectedBrand] = useState<string>("All"); // brand name
  const [priceRange, setPriceRange] = useState<
    "All" | "Under 40k" | "40k - 70k" | "70k+"
  >("All");
  const [selectedDiscount, setSelectedDiscount] = useState<
    "All" | "10%+" | "20%+"
  >("All");
  const [selectedDelivery, setSelectedDelivery] = useState<
    "All" | DeliveryMode
  >("All");
  const [sort, setSort] = useState<SortMode>("Relevance");

  // ✅ Convert API products into safe array
  const allProducts: ApiProduct[] = useMemo(() => {
    return Array.isArray(productss) ? productss : [];
  }, [productss]);

  /**
   * ✅ MAIN FILTER: category slug from URL
   * Example route: /products/:category
   * category = "electrical-wires"
   */
  const productsByUrlCategory = useMemo(() => {
    if (!category) return allProducts; // if no category in url show all
    return allProducts.filter((p) => p?.category?.slug === category);
  }, [allProducts, category]);

  /**
   * ✅ Dropdown options should come from filtered products list
   * so it feels "relevant" like Croma filters.
   */
  const categoryOptions = useMemo(() => {
    const uniqueMap = new Map<string, { name: string; slug: string }>();

    productsByUrlCategory.forEach((p) => {
      if (p?.category?.slug) {
        uniqueMap.set(p.category.slug, {
          name: p.category.name,
          slug: p.category.slug,
        });
      }
    });

    return [{ name: "All", slug: "All" }, ...Array.from(uniqueMap.values())];
  }, [productsByUrlCategory]);

  const brandOptions = useMemo(() => {
    // Prefer backend brands hook, fallback to products
    const hookBrands = Array.isArray(brands)
      ? brands.filter((b: ApiBrand) => b.is_active)
      : [];

    if (hookBrands.length) {
      return ["All", ...hookBrands.map((b) => b.name)];
    }

    const unique = Array.from(
      new Set(productsByUrlCategory.map((p) => p.brand?.name).filter(Boolean)),
    ) as string[];

    return ["All", ...unique];
  }, [brands, productsByUrlCategory]);

  /**
   * ✅ Apply Filters (Category dropdown, Brand dropdown, Price, Discount, Sort)
   */
  const filteredProducts = useMemo(() => {
    let list = [...productsByUrlCategory];

    // ✅ Category dropdown filter (slug)
    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category?.slug === selectedCategory);
    }

    // ✅ Brand dropdown filter (brand name)
    if (selectedBrand !== "All") {
      list = list.filter((p) => p.brand?.name === selectedBrand);
    }

    // ✅ Delivery Mode filter (you don't have this in API now)
    // For now we skip it, but keep structure.
    if (selectedDelivery !== "All") {
      // Later: list = list.filter(...)
    }

    // ✅ Price range filter
    if (priceRange !== "All") {
      list = list.filter((p) => {
        const price = Number(p.price);
        if (Number.isNaN(price)) return false;

        if (priceRange === "Under 40k") return price < 40000;
        if (priceRange === "40k - 70k") return price >= 40000 && price <= 70000;
        if (priceRange === "70k+") return price > 70000;

        return true;
      });
    }

    // ✅ Discount filter
    if (selectedDiscount !== "All") {
      list = list.filter((p) => {
        const price = Number(p.price);
        const old = p.old_price ? Number(p.old_price) : 0;
        const percent = calcDiscountPercent(old, price) ?? 0;

        if (selectedDiscount === "10%+") return percent >= 10;
        if (selectedDiscount === "20%+") return percent >= 20;

        return true;
      });
    }

    // ✅ Sorting
    list.sort((a, b) => {
      const aPrice = Number(a.price) || 0;
      const bPrice = Number(b.price) || 0;

      if (sort === "Relevance") return 0;
      if (sort === "Price: Low to High") return aPrice - bPrice;
      if (sort === "Price: High to Low") return bPrice - aPrice;

      if (sort === "Rating") {
        // rating not in API currently
        return 0;
      }

      if (sort === "Newest") {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }

      return 0;
    });

    return list;
  }, [
    productsByUrlCategory,
    selectedCategory,
    selectedBrand,
    selectedDelivery,
    priceRange,
    selectedDiscount,
    sort,
  ]);

  const activeCount = filteredProducts.length;

  const clearAll = () => {
    setSelectedCategory("All");
    setSelectedBrand("All");
    setPriceRange("All");
    setSelectedDiscount("All");
    setSelectedDelivery("All");
    setSort("Relevance");
  };

  // ✅ Reset dropdown category when URL category changes
  useEffect(() => {
    setSelectedCategory("All");
  }, [category]);

  const pageTitle = useMemo(() => {
    if (!category) return "Products";
    const matched = categoryOptions.find((c) => c.slug === category);
    return matched?.name || category;
  }, [category, categoryOptions]);

  const loading = productsLoading || brandsLoading;

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
          <span className="hover:text-white transition cursor-pointer">
            Home
          </span>
          <span className="text-white/30">›</span>
          <span className="hover:text-white transition cursor-pointer">
            Categories
          </span>
          <span className="text-white/30">›</span>
          <span className="text-white font-semibold">{pageTitle}</span>
        </div>

        {/* Title */}
        <div className="mt-2 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-medium tracking-tight capitalize">
              {pageTitle}{" "}
              <span className="text-white/60 text-sm">({activeCount})</span>
            </h1>
          </div>
        </div>

        {/* Filters Row */}
        <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          {/* Left filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Category */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white outline-none hover:bg-white/10 transition"
            >
              {categoryOptions.map((c) => (
                <option key={c.slug} value={c.slug} className="bg-[#0B0B0D]">
                  Categories: {c.name}
                </option>
              ))}
            </select>

            {/* Brand */}
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white outline-none hover:bg-white/10 transition"
            >
              {brandOptions.map((b) => (
                <option key={b} value={b} className="bg-[#0B0B0D]">
                  Brand: {b}
                </option>
              ))}
            </select>

            {/* Price */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value as any)}
              className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white outline-none hover:bg-white/10 transition"
            >
              {["All", "Under 40k", "40k - 70k", "70k+"].map((p) => (
                <option key={p} value={p} className="bg-[#0B0B0D]">
                  Price: {p}
                </option>
              ))}
            </select>

            {/* Discount */}
            <select
              value={selectedDiscount}
              onChange={(e) => setSelectedDiscount(e.target.value as any)}
              className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white outline-none hover:bg-white/10 transition"
            >
              {["All", "10%+", "20%+"].map((d) => (
                <option key={d} value={d} className="bg-[#0B0B0D]">
                  Discount: {d}
                </option>
              ))}
            </select>

            <button
              onClick={clearAll}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10 transition"
            >
              Clear Filters
            </button>
          </div>

          {/* Right sort */}
          <div className="flex items-center justify-between gap-3 lg:justify-end">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white outline-none hover:bg-white/10 transition"
            >
              {[
                "Relevance",
                "Price: Low to High",
                "Price: High to Low",
                "Rating",
                "Newest",
              ].map((s) => (
                <option key={s} value={s} className="bg-[#0B0B0D]">
                  Sort By {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-sm text-white/70">Loading products...</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((p) => {
              const price = Number(p.price) || 0;
              const oldPrice = p.old_price ? Number(p.old_price) : undefined;

              const discountPercent = calcDiscountPercent(oldPrice, price);

              const outOfStock = p.stock <= 0;

              return (
                <div
                  key={p.id}
                  className="group rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
                >
                  {/* Image */}
                  <div className="relative rounded-lg bg-white/10 p-5 h-[240px] flex items-center justify-center overflow-hidden">
                    <img
                      src={
                        p.image ||
                        "https://via.placeholder.com/400x400?text=No+Image"
                      }
                      alt={p.name}
                      className="h-full w-full object-contain group-hover:scale-[1.03] transition duration-300"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="mt-4">
                    <h3 className="text-sm font-medium leading-snug text-white line-clamp-2">
                      {p.name}
                    </h3>

                    <div className="mt-2 text-xs text-white/50">
                      <span className="font-semibold text-white/70">
                        {p.brand?.name}
                      </span>{" "}
                      •{" "}
                      <span className="text-white/60">{p.category?.name}</span>
                    </div>

                    <div>
                      {p.description && (
                        <p className="mt-2 text-xs text-white/50 line-clamp-2">
                          {p.description}
                        </p>
                      )}
                    </div>

                    {/* Price */}
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <span className="text-2xl font-medium tracking-tight">
                        ₹{formatINR(price)}
                      </span>

                      {!!oldPrice && (
                        <span className="text-sm text-white/40 line-through">
                          ₹{formatINR(oldPrice)}
                        </span>
                      )}

                      {discountPercent !== null && (
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-white">
                          {discountPercent}% Off
                        </span>
                      )}
                    </div>

                    <div>
                      {p.min_order_quantity && (
                        <span className="text-xs text-white/50">
                          Min Order Quantity: {p.min_order_quantity}
                        </span>
                      )}
                    </div>

                    {/* Stock */}
                    <div className="mt-3 text-xs">
                      {outOfStock ? (
                        <span className="text-red-400 font-semibold">
                          Out of stock
                        </span>
                      ) : (
                        <span className="text-emerald-300 font-semibold">
                          In stock ({p.stock})
                        </span>
                      )}
                    </div>

                    <div className="mt-5">
                      <span className="inline-flex items-center rounded-full bg-emerald-200 px-4 py-2 text-xs font-extrabold text-black">
                        Order Now
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 h-px w-full bg-white/10" />
                </div>
              );
            })}
          </div>
        )}

        {/* No products */}
        {!loading && filteredProducts.length === 0 && (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-lg font-extrabold">No products found</p>
            <p className="mt-2 text-sm text-white/60">
              Try adjusting filters or clear all filters to see items.
            </p>
            <button
              onClick={clearAll}
              className="mt-5 rounded-xl bg-[#E02C2C] px-5 py-3 text-sm font-bold hover:bg-[#B91C1C] transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPage;
