import React, { useEffect, useMemo, useState } from "react";
import { useBrands } from "../hooks/useBrands";
import { useProducts } from "../hooks/useProducts";
import { Link } from "react-router-dom";
import { Search, X, Sparkles, ArrowRight, Star, Layers } from "lucide-react";
import { useBanners } from "../hooks/useBanners";
import type { HomeBanner } from "../types";

type ApiBrand = {
  id: number;
  name: string;
  logo?: string | null;
  is_active: boolean;
};

type ApiCategory = {
  id: number;
  name: string;
  slug: string;
  parent: number | null;
  is_active: boolean;
  category_type?: "MAIN" | "SUB" | "LEAF";
  full_path?: string;
};

type ApiProduct = {
  id: number;
  name: string;
  slug: string;
  description?: string;

  price: string; // API returns string
  old_price?: string | null;

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

const BrandPage: React.FC = () => {
  const { data: brandsData, isLoading: brandsLoading } = useBrands();
  const { data: productsData, isLoading: productsLoading } = useProducts();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");

    const handleChange = () => setIsMobile(media.matches);

    handleChange();
    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  const { data: banners = [] } = useBanners();

  const brandBanner: HomeBanner | undefined = useMemo(() => {
    const type = isMobile ? "TOP_BRANDS_MOBILE" : "TOP_BRANDS";

    return banners?.find(
      (b: HomeBanner) => b.banner_type === type && b.is_active,
    );
  }, [banners, isMobile]);

  const [brandQuery, setBrandQuery] = useState("");
  const [selectedBrandIds, setSelectedBrandIds] = useState<number[]>([]);

  const brands: ApiBrand[] = useMemo(() => {
    const arr = Array.isArray(brandsData) ? (brandsData as ApiBrand[]) : [];
    return arr.filter((b) => b.is_active);
  }, [brandsData]);

  const products: ApiProduct[] = useMemo(() => {
    const arr = Array.isArray(productsData)
      ? (productsData as ApiProduct[])
      : [];
    return arr.filter((p) => p.is_active);
  }, [productsData]);

  const filteredBrands = useMemo(() => {
    const q = brandQuery.trim().toLowerCase();
    if (!q) return brands;
    return brands.filter((b) => b.name.toLowerCase().includes(q));
  }, [brands, brandQuery]);

  const selectedBrands = useMemo(() => {
    return brands.filter((b) => selectedBrandIds.includes(b.id));
  }, [brands, selectedBrandIds]);

  const filteredProducts = useMemo(() => {
    // ✅ If nothing selected -> show nothing (clean UX)
    if (selectedBrandIds.length === 0) return [];

    return products.filter((p) => selectedBrandIds.includes(p.brand?.id));
  }, [products, selectedBrandIds]);

  /**
   * ✅ Group products by category (you requested this)
   * Category in your product = LEAF category (perfect for filter pages)
   */
  const productsGroupedByCategory = useMemo(() => {
    const map = new Map<
      string,
      { category: ApiCategory; items: ApiProduct[] }
    >();

    filteredProducts.forEach((p) => {
      const key = p.category?.slug || "unknown-category";
      if (!map.has(key)) {
        map.set(key, { category: p.category, items: [] });
      }
      map.get(key)!.items.push(p);
    });

    // ✅ convert to array and sort by category name
    const grouped = Array.from(map.values()).sort((a, b) =>
      a.category.name.localeCompare(b.category.name),
    );

    // ✅ sort products inside each category (optional)
    grouped.forEach((g) => {
      g.items.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    });

    return grouped;
  }, [filteredProducts]);

  const toggleBrand = (id: number) => {
    setSelectedBrandIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const clearBrands = () => setSelectedBrandIds([]);

  const loading = brandsLoading || productsLoading;

  const WHATSAPP_NUMBER = "917664939393"; 

  const buildWhatsAppLink = (product: any) => {
    const message = `Hi, I am interested in this product:\n\n${product.name}\n\nProduct ID: ${product.id}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white">
      {/* ✅ HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        {/* ✅ Background Image Layer */}
        <img
          src={brandBanner?.image || "/banner1.jpg"}
          alt={brandBanner?.title || "Top Brands Banner"}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* ✅ Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/55" />

        {/* ✅ Glow + gradient effects */}
        <div className="absolute inset-0">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-red-500/20 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent" />
        </div>

        {/* ✅ Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 md:py-14">
          <div className="flex flex-col gap-3">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur">
              <Sparkles className="w-4 h-4 text-[#E02C2C]" />
              Top Brands • Premium Picks
            </p>

            <h1 className="text-2xl md:text-4xl font-medium tracking-tight text-white">
              {brandBanner?.title || "Shop by Brands"}
            </h1>

            <p className="max-w-2xl text-sm md:text-base text-white/70">
              {brandBanner?.description ||
                "Select one or multiple brands and explore products grouped by category — a clean premium browsing experience."}
            </p>

            {/* Brand search */}
            <div className="mt-5 flex flex-col gap-3 md:flex-row">
              <div className="flex w-full items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl shadow-xl md:max-w-lg">
                <Search className="h-5 w-5 text-white/60" />
                <input
                  value={brandQuery}
                  onChange={(e) => setBrandQuery(e.target.value)}
                  placeholder="Search brand name..."
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
                />
                {brandQuery.trim() && (
                  <button
                    onClick={() => setBrandQuery("")}
                    className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-bold text-white/80 transition hover:bg-white/10"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={clearBrands}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-medium text-white transition hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                  Clear Selection
                </button>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-medium text-white/70">
                  Selected:{" "}
                  <span className="text-white">{selectedBrandIds.length}</span>
                </div>
              </div>
            </div>

            {/* Selected brand chips */}
            {selectedBrands.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedBrands.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => toggleBrand(b.id)}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#E02C2C]/20 px-4 py-2 text-xs font-medium text-white transition hover:bg-[#E02C2C]/30"
                  >
                    <span>{b.name}</span>
                    <span className="opacity-80 group-hover:opacity-100">
                      ✕
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ✅ BRAND SELECTOR (Innovative - Logo Card Grid + Multi Select) */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg md:text-xl font-medium">Select Brands</h2>
            <p className="text-sm text-white/60 mt-1">
              Tap logos to multi-select. No dropdowns.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-white/60">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
              Tip: Select multiple brands
            </span>
          </div>
        </div>

        {brandsLoading ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
            Loading brands...
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {filteredBrands.map((b) => {
              const active = selectedBrandIds.includes(b.id);

              return (
                <button
                  key={b.id}
                  onClick={() => toggleBrand(b.id)}
                  className={`group relative overflow-hidden rounded-2xl border p-4 transition text-left
                    ${
                      active
                        ? "border-[#E02C2C] bg-[#E02C2C]/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }
                  `}
                >
                  {/* Premium glow */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition ${
                      active ? "opacity-100" : ""
                    }`}
                  >
                    <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-red-500/20 blur-3xl" />
                  </div>

                  <div className="relative flex flex-col items-start gap-1">
                    <div className="flex items-center justify-between w-full">
                      {active && (
                        <span className="rounded-full bg-[#E02C2C] px-3 py-1 text-[10px] font-medium text-white">
                          Selected
                        </span>
                      )}
                    </div>

                    <div className="h-18 w-full flex items-center justify-center rounded-xl border border-white/10 bg-black/30 overflow-hidden">
                      {b.logo ? (
                        <img
                          src={b.logo}
                          alt={b.name}
                          className="h-full w-full object-contain "
                        />
                      ) : (
                        <span className="text-xs text-white/50">{b.name}</span>
                      )}
                    </div>

                    <p className="text-sm font-medium leading-tight line-clamp-1">
                      {b.name}
                    </p>

                    <p className="text-xs text-white/50">
                      Tap to {active ? "remove" : "select"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* ✅ PRODUCTS (Grouped by Categories) */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg md:text-xl font-medium">
              Brand Products by Category
            </h2>
            <p className="text-sm text-white/60 mt-1">
              Results are automatically grouped by category.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs text-white/60">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <Layers className="w-4 h-4" />
              Categories: {productsGroupedByCategory.length}
            </span>
          </div>
        </div>

        {/* Empty / Loading */}
        {loading && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-white/70">
            Loading products...
          </div>
        )}

        {!loading && selectedBrandIds.length === 0 && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-lg font-medium">
              Select a brand to view products
            </p>
            <p className="mt-2 text-sm text-white/60">
              Choose one or more brands above to load products categorized by
              leaf categories.
            </p>
          </div>
        )}

        {!loading &&
          selectedBrandIds.length > 0 &&
          filteredProducts.length === 0 && (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
              <p className="text-lg font-medium">No products found</p>
              <p className="mt-2 text-sm text-white/60">
                Try selecting different brands.
              </p>
              <button
                onClick={clearBrands}
                className="mt-5 rounded-xl bg-[#E02C2C] px-5 py-3 text-sm font-bold hover:bg-[#B91C1C] transition"
              >
                Clear Selection
              </button>
            </div>
          )}

        {/* Category Sections */}
        {!loading &&
          selectedBrandIds.length > 0 &&
          productsGroupedByCategory.map((group) => (
            <div key={group.category.slug} className="mt-10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="text-base md:text-lg font-medium">
                    {group.category.name}
                    <span className="ml-2 text-white/60 text-sm">
                      ({group.items.length})
                    </span>
                  </h3>

                  {group.category.full_path && (
                    <p className="mt-1 text-xs text-white/50 line-clamp-1">
                      {group.category.full_path}
                    </p>
                  )}
                </div>

                {/* ✅ Category redirect button */}
                <Link
                  to={`/filter/${group.category.slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white hover:bg-white/10 transition w-fit"
                >
                  View in Filter Page <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Products Grid */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.items.slice(0, 6).map((p) => {
                  const price = Number(p.price) || 0;
                  const old = p.old_price ? Number(p.old_price) : undefined;
                  const discount = calcDiscountPercent(old, price);
                  const outOfStock = p.stock <= 0;

                  return (
                    <div
                      key={p.id}
                      className="group rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition overflow-hidden"
                    >
                      {/* image */}
                      <div className="relative flex justify-center items-center  w-full bg-white overflow-hidden">
                        <img
                          src={
                            p.image ||
                            "https://via.placeholder.com/600x400?text=No+Image"
                          }
                          alt={p.name}
                          className="h-72  object-cover group-hover:scale-105 transition duration-500"
                        />

                        {discount !== null && (
                          <div className="absolute top-3 left-3 rounded-full bg-[#E02C2C] px-4 py-2 text-xs font-medium">
                            {discount}% Off
                          </div>
                        )}
                      </div>

                      {/* content */}
                      <div className="p-5">
                        <p className="text-xs text-white/60 font-semibold">
                          {p.brand?.name}
                        </p>

                        <h4 className="mt-1 text-sm font-medium leading-snug line-clamp-2">
                          {p.name}
                        </h4>

                        <div className=" flex items-center justify-between">
                          {price != null && price > 0 && (
                            <div className="mt-3 flex flex-wrap items-center gap-3">
                              <span className="text-2xl font-medium tracking-tight text-white">
                                ₹{formatINR(price)}
                              </span>

                              {!!old && old > 0 && (
                                <span className="text-sm text-white/40 line-through">
                                  ₹{formatINR(old)}
                                </span>
                              )}

                              {discount != null && discount > 0 && (
                                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-white">
                                  {discount}% Off
                                </span>
                              )}
                            </div>
                          )}

                          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-bold text-white/80">
                            <Star className="w-4 h-4 text-yellow-400" />
                            4.2
                          </span>
                        </div>

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

                        <div className="mt-4">
                          <a
                            href={buildWhatsAppLink(p)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full rounded-xl bg-linear-to-r from-red-500/80 to-red-500/40 px-4 py-3 text-sm font-medium text-white hover:bg-[#B91C1C] transition"
                          >
                            Order Now
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Optional: View More */}
              {group.items.length > 6 && (
                <div className="mt-5 flex justify-center">
                  <Link
                    to={`/filter/${group.category.slug}`}
                    className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:bg-white/10 transition"
                  >
                    View all {group.items.length} products in{" "}
                    {group.category.name}
                  </Link>
                </div>
              )}
            </div>
          ))}
      </section>
    </div>
  );
};

export default BrandPage;
