import React, { useMemo, useState } from "react";
import { Heart, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number; // 0 to 5
  reviewsCount?: number;
};

const formatINR = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
};

const FeaturedProducts: React.FC = () => {
  const navigate = useNavigate();
  const products: Product[] = useMemo(
    () => [
      {
        id: 1,
        title: "Croma 5 Litre Instant Geyser with Efficient Heating Technology",
        image:
          "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=900&auto=format&fit=crop",
        price: 3999,
        oldPrice: 6000,
        rating: 4.0,
      },
      {
        id: 2,
        title: "Honeywell Air Touch V3 Air Purifier with 3D Air Flow (White)",
        image:
          "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=900&auto=format&fit=crop",
        price: 9299,
        oldPrice: 15299,
        rating: 3.0,
      },
      {
        id: 3,
        title: "Russell Hobbs DOME1515 1500 Watt 1.5 Litre Electric Kettle",
        image:
          "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?q=80&w=900&auto=format&fit=crop",
        price: 799,
        oldPrice: 1895,
        rating: 4.5,
      },
      {
        id: 4,
        title: "Premium LED Smart Bulb 12W with App Control & Voice Assistant",
        image:
          "https://images.unsplash.com/photo-1504198458649-3128b932f49b?q=80&w=900&auto=format&fit=crop",
        price: 499,
        oldPrice: 799,
        rating: 4.2,
      },
    ],
    []
  );

  const [wishlisted, setWishlisted] = useState<Record<number, boolean>>({});

  const toggleWishlist = (id: number) => {
    setWishlisted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Optional: horizontal scroll controls (mobile)
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

          {/* Arrow controls (nice for mobile) */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="rounded-full border border-[#2A2C33] bg-[#121216] p-2 text-white hover:border-[#E02C2C] transition"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="rounded-full border border-[#2A2C33] bg-[#121216] p-2 text-white hover:border-[#E02C2C] transition"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile: horizontal scroll | Desktop: grid */}
        <div
          id={scrollContainerId}
          className="
            mt-6
            flex gap-4 overflow-x-auto pb-3
            sm:grid sm:overflow-visible sm:pb-0
            sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            scrollbar-hide
          "
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {products.map((p) => (
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
            >
              {/* Wishlist */}
              {/* <button
                onClick={() => toggleWishlist(p.id)}
                className="
                  absolute right-3 top-3 z-20
                  rounded-full
                  bg-black/50
                  p-2
                  text-white
                  hover:bg-black/70
                  transition
                "
                aria-label="Add to wishlist"
              >
                <Heart
                  className={`h-5 w-5 transition ${
                    wishlisted[p.id]
                      ? "fill-[#E02C2C] text-[#E02C2C]"
                      : "text-white"
                  }`}
                />
              </button> */}

              {/* Image */}
              <div className="relative h-[210px] w-full bg-[#0B0B0D] flex items-center justify-center">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-contain p-6 transition duration-500 group-hover:scale-[1.03]"
                  draggable={false}
                />

                {/* subtle overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/35" />
              </div>

              {/* Details */}
              <div className="p-4">
                {/* Title */}
                <h3 className="text-white font-extrabold text-sm leading-snug line-clamp-2">
                  {p.title}
                </h3>

                {/* Price Row */}
                <div className="mt-3 flex items-end gap-2">
                  <p className="text-white font-extrabold text-lg">
                    {formatINR(p.price)}
                  </p>

                  {p.oldPrice && (
                    <p className="text-sm text-white/40 line-through">
                      {formatINR(p.oldPrice)}
                    </p>
                  )}
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
                  onClick={() => navigate(`/detail`)}
                  className="
                    mt-4 w-full
                    rounded-xl
                    bg-[#0B0B0D]
                    border border-[#2A2C33]
                    px-4 py-2.5
                    text-sm font-bold text-white
                    hover:border-[#E02C2C]
                    hover:bg-white/5
                    transition
                  "
                >
                  View Product
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile hint */}
        <p className="mt-4 text-xs text-[#9AA3AF] sm:hidden">
          Swipe horizontally to view more products
        </p>
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default FeaturedProducts;
