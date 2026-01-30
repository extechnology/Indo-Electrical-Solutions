import React, { useMemo, useState, useEffect, useRef } from "react";
import { useProducts } from "../hooks/useProducts";
import { useParams } from "react-router-dom";
import { useBrands } from "../hooks/useBrands";
import { useCategories } from "../hooks/useCategories";
import type { ApiCategory } from "../types";

type DeliveryMode = "Home Delivery" | "Store Pickup";
type SortMode =
  | "Relevance"
  | "Price: Low to High"
  | "Price: High to Low"
  | "Rating"
  | "Newest";

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
  const { category } = useParams();
  const { data: productss, isLoading: productsLoading } = useProducts();
  const { data: brands, isLoading: brandsLoading } = useBrands();
  const { data: categories } = useCategories();
  const [openDescId, setOpenDescId] = useState<number | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const PAGE_SIZE = 12;

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
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

  const allProducts: ApiProduct[] = useMemo(() => {
    return Array.isArray(productss) ? productss : [];
  }, [productss]);

  const leafCategories = categories?.filter(
    (leaf: ApiCategory) => leaf.category_type === "LEAF",
  );

  const productsByUrlCategory = useMemo(() => {
    if (!category) return allProducts;

    return allProducts.filter((p) => p?.category?.slug === category);
  }, [allProducts, category]);

  const categoryOptions = useMemo(() => {
    if (!leafCategories?.length) {
      return [{ name: "All", slug: "All" }];
    }

    return [
      { name: "All", slug: "All" },
      ...leafCategories.map((c: ApiCategory) => ({
        name: c.full_path || c.name, // nice UX if available
        slug: c.slug,
      })),
    ];
  }, [leafCategories]);

  const brandOptions = useMemo(() => {
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

  const filteredProducts = useMemo(() => {
    let list = [...allProducts];

    if (category) {
      list = list.filter((p) => p.category?.slug === category);
    }

    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category?.slug === selectedCategory);
    }

    if (selectedBrand !== "All") {
      list = list.filter((p) => p.brand?.name === selectedBrand);
    }
    if (selectedDelivery !== "All") {
    }
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

    //  Discount filter
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

    //  Sorting
    list.sort((a, b) => {
      const aPrice = Number(a.price) || 0;
      const bPrice = Number(b.price) || 0;

      if (sort === "Relevance") return 0;
      if (sort === "Price: Low to High") return aPrice - bPrice;
      if (sort === "Price: High to Low") return bPrice - aPrice;

      if (sort === "Rating") {
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

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedCategory,
    selectedBrand,
    priceRange,
    selectedDiscount,
    selectedDelivery,
    sort,
    category,
  ]);

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setOpenDescId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setSelectedCategory("All");
  }, [category]);

  const pageTitle = useMemo(() => {
    if (!category) return "Products";
    const matched = categoryOptions.find((c) => c.slug === category);
    return matched?.name || category;
  }, [category, categoryOptions]);

  const renderDescription = (desc: string) => {
    if (!desc.includes("#")) return <p>{desc}</p>;

    const points = desc
      .split("#")
      .map((d) => d.trim())
      .filter(Boolean);

    return (
      <ul className="list-disc pl-4 space-y-1">
        {points.map((pt, i) => (
          <li key={i}>{pt}</li>
        ))}
      </ul>
    );
  };

  const loading = productsLoading || brandsLoading;

  const WHATSAPP_NUMBER = "917664939393";

  const buildWhatsAppLink = (product: any) => {
    const message = `Hi, I am interested in this product:\n\n${product.name}\n\nProduct ID: ${product.id}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

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
              {leafCategories.map((c: ApiCategory) => (
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
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {paginatedProducts.map((p) => {
              const price = Number(p.price) || 0;
              const oldPrice = p.old_price ? Number(p.old_price) : undefined;

              const discountPercent = calcDiscountPercent(oldPrice, price);

              // const outOfStock = p.stock <= 0;

              return (
                <div
                  key={p.id}
                  className="group relative flex h-full flex-col rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
                >
                  {/* Image */}
                  <div className="relative h-[240px] overflow-hidden rounded-lg bg-white p-5">
                    <img
                      src={
                        p.image ||
                        "https://via.placeholder.com/400x400?text=No+Image"
                      }
                      alt={p.name}
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="mt-4 flex flex-1 flex-col">
                    {/* Title */}
                    <h3 className="text-sm font-medium leading-snug text-white line-clamp-2">
                      {p.name}
                    </h3>

                    {/* Meta */}
                    <div className="mt-2 text-xs text-white/50">
                      <span className="font-semibold text-white/70">
                        {p.brand?.name}
                      </span>{" "}
                      •{" "}
                      <span className="text-white/60">{p.category?.name}</span>
                    </div>

                    {/* Description */}
                    {p.description?.trim() ? (
                      <div className="relative mt-2">
                        <p className="text-xs text-white/50 line-clamp-2">
                          {p.description}
                        </p>

                        <button
                          onClick={() =>
                            setOpenDescId(openDescId === p.id ? null : p.id)
                          }
                          className="mt-1 text-xs font-semibold text-emerald-300 hover:underline"
                        >
                          View more
                        </button>

                        {/* Tooltip */}
                        <div
                          ref={openDescId === p.id ? tooltipRef : null}
                          className={`
        absolute left-0 bottom-full z-30 mb-2 w-full
        transition-all duration-300
        ${
          openDescId === p.id
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }
      `}
                        >
                          <div className="rounded-lg border border-white/10 bg-black/80 p-3 text-xs text-white/90 backdrop-blur-md shadow-lg">
                            <div className="leading-relaxed">
                              {renderDescription(p.description)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2 h-[32px]" />
                    )}

                    {/* Price block */}
                    {price != null && price > 0 && (
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <span className="text-2xl font-medium tracking-tight text-white">
                          ₹ {formatINR(price)}
                        </span>

                        {!!oldPrice && oldPrice > 0 && (
                          <span className="text-sm text-white/40 line-through">
                            ₹ {formatINR(oldPrice)}
                          </span>
                        )}

                        {discountPercent != null && discountPercent > 0 && (
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-white">
                            {discountPercent}% Off
                          </span>
                        )}
                      </div>
                    )}

                    {/* Min order quantity */}
                    {p.min_order_quantity && (
                      <span className="mt-2 text-sm font-semibold text-white/80">
                        Min Order Quantity: {p.min_order_quantity}
                      </span>
                    )}

                    {/* ✅ Push button to bottom (equal card height always) */}
                    <div className="mt-auto pt-5">
                      <a
                        href={buildWhatsAppLink(p)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-full bg-emerald-200 px-4 py-2 text-xs font-extrabold text-black transition hover:scale-[1.03] active:scale-[0.98]"
                      >
                        Order Now
                      </a>
                    </div>

                    <div className="mt-6 h-px w-full bg-white/10" />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 text-sm rounded-lg border border-white/10 bg-white/5 disabled:opacity-40"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 text-sm rounded-lg border
          ${
            currentPage === page
              ? "bg-white text-black"
              : "border-white/10 bg-white/5"
          }`}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 text-sm rounded-lg border border-white/10 bg-white/5 disabled:opacity-40"
            >
              Next
            </button>
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
