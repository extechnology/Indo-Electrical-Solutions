import React, { useMemo } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import type { ApiProduct } from "../../types";

export type FeaturedUiProduct = {
  id: number;
  name: string;
  slug: string;
  image: string;

  categorySlug: string;

  price: number;
  oldPrice?: number;

  rating: number;
  description: string;

  brandName: string;

  stock: number;
  min_order_quantity: number;
};

const formatINR = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

const FeaturedProducts: React.FC = () => {
  const { data: products = [], isLoading } = useProducts();
  const navigate = useNavigate();

  const scrollContainerId = "featured-products-scroll";

  const scroll = (dir: "left" | "right") => {
    const el = document.getElementById(scrollContainerId);
    if (!el) return;

    const amount = 320;
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  // ✅ Convert API -> UI (fix all mismatched fields here)
  const featuredProducts = useMemo<FeaturedUiProduct[]>(() => {
    return (products as ApiProduct[])
      .filter((p) => p.is_active && p.is_featured)
      .map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        image: p.image || "/placeholder.png",

        categorySlug: p.category?.slug || "",

        price: Number(p.price || 0),
        oldPrice: p.old_price ? Number(p.old_price) : undefined,

        rating: typeof p.rating === "number" ? p.rating : 4.0,

        description: p.description || "",
        brandName: p.brand?.name || "Brand",

        stock: p.stock,
        min_order_quantity: p.min_order_quantity,
      }));
  }, [products]);

  console.log(featuredProducts, "featured");

  return (
    <section className="w-full bg-[#0B0B0D] py-10">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-white text-xl sm:text-2xl font-medium">
              Featured Products
            </h2>
            <p className="mt-1 text-sm text-[#9AA3AF]">
              Hand-picked products with best value deals
            </p>
          </div>

          {/* Arrow controls */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="rounded-full border border-[#2A2C33] bg-[#121216] p-2 text-white hover:border-[#E02C2C] transition"
              aria-label="Scroll left"
              type="button"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="rounded-full border border-[#2A2C33] bg-[#121216] p-2 text-white hover:border-[#E02C2C] transition"
              aria-label="Scroll right"
              type="button"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-sm text-white/70">
              Loading featured products...
            </p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && featuredProducts.length === 0 && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-lg font-bold">No featured products found</p>
          </div>
        )}

        {/* Products */}
        {!isLoading && featuredProducts.length > 0 && (
          <div
            id={scrollContainerId}
            className="
              mt-6
              flex gap-4 overflow-x-auto pb-3
              sm:grid sm:overflow-visible sm:pb-0
              sm:grid-cols-2 cursor-pointer lg:grid-cols-3 xl:grid-cols-4
              scrollbar-hide
            "
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {featuredProducts.map((p) => (
              <div
                key={p.id}
                className="
                  group relative
                  w-[260px] shrink-0
                  sm:w-auto
                  rounded-md
                  border border-[#2A2C33]
                  bg-[#121216]
                  overflow-hidden
                  transition
                  hover:border-[#E02C2C]
                  hover:shadow-2xl hover:shadow-black/50
                "
                onClick={() => navigate(`/filter/${p?.categorySlug}`)}
              >
                {/* Image */}
                <div className="relative h-[210px] w-full bg-white flex items-center justify-center">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-contain p-6 transition duration-500 group-hover:scale-[1.03]"
                    draggable={false}
                    loading="lazy"
                  />
                  {/* <p className="absolute right-4 bottom-4 px-3 py-1 rounded-2xl bg-linear-to-r from-slate-950 to-gray-800 text-xs text-white ">
                    Stock : {p.stock}
                  </p> */}
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/35" />
                </div>

                {/* Details */}
                <div className="p-4">
                  {/* Brand */}
                  <p className="text-[11px] text-white/60 font-semibold">
                    {p.brandName}
                  </p>

                  {/* Title */}
                  <h3 className="mt-1 text-white font-extrabold text-sm leading-snug line-clamp-2">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-white font-light text-xs leading-snug line-clamp-2">
                    {p.description}
                  </p>

                  {/* Price */}
                  {p?.price && (
                    <div className="mt-3 flex items-end gap-2">
                      <p className="text-white font-bold text-lg">
                        {formatINR(p.price)}
                      </p>

                      {p.oldPrice && (
                        <p className="text-sm text-white/40 line-through">
                          {formatINR(p.oldPrice)}
                        </p>
                      )}
                    </div>
                  )}

                  <div>
                    <p className="mt-1 text-white font-light text-xs leading-snug line-clamp-2">
                      Minimum Order : {p.min_order_quantity}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="mt-3 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => {
                      const filled = idx + 1 <= Math.round(p.rating);
                      return (
                        <Star
                          key={idx}
                          className={`h-4 w-4 ${
                            filled
                              ? "fill-[#E02C2C] text-[#E02C2C]"
                              : "text-white/25"
                          }`}
                        />
                      );
                    })}

                    <span className="ml-2 text-xs text-[#9AA3AF]">
                      {p.rating.toFixed(1)}
                    </span>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/filter/${p?.categorySlug}`);
                    }}
                    className="
                      mt-4 w-full
                      rounded-xl
                      cursor-pointer
                      bg-[#0B0B0D]
                      border border-[#2A2C33]
                      px-4 py-2.5
                      text-sm font-bold text-white
                      hover:border-[#E02C2C]
                      hover:bg-white/5
                      transition
                    "
                    type="button"
                  >
                    View Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mobile hint */}
        {!isLoading && featuredProducts.length > 0 && (
          <p className="mt-4 text-xs text-[#9AA3AF] sm:hidden">
            Swipe horizontally to view more products
          </p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
