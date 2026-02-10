import React, { useMemo, useState } from "react";
import {
  Tv,
  WashingMachine,
  Smartphone,
  CookingPot,
  Lightbulb,
  Heart,
  ChevronLeft,
  ChevronRight,
  Plug,
  Fan,
  Droplets,
  ShoppingBag,
  Laptop,
} from "lucide-react";
import { useCategories } from "../../hooks/useCategories";
import { useNavigate } from "react-router-dom";

type ApiCategory = {
  id: number;
  name: string;
  slug: string;
  parent: number | null;
  is_active: boolean;
  category_type?: "MAIN" | "SUB" | "LEAF";
  full_path?: string;
  image?: string | null;
};

const getCategoryIcon = (category: ApiCategory) => {
  const slug = category?.slug.toLowerCase();
  const name = category?.name.toLowerCase();
  const full = (category.full_path || "").toLowerCase();

  // ✅ Prefer slug check (most reliable)
  if (slug.includes("electrical") || full.includes("electrical"))
    return <Plug className="w-6 h-6" />;
  if (
    slug.includes("lighting") ||
    slug.includes("led") ||
    name.includes("bulb")
  )
    return <Lightbulb className="w-6 h-6" />;
  if (slug.includes("fan") || name.includes("fan"))
    return <Fan className="w-6 h-6" />;
  if (slug.includes("mobile") || slug.includes("phone"))
    return <Smartphone className="w-6 h-6" />;
  if (slug.includes("kitchen")) return <CookingPot className="w-6 h-6" />;
  if (slug.includes("tv") || slug.includes("audio") || slug.includes("video"))
    return <Tv className="w-6 h-6" />;
  if (slug.includes("wash")) return <WashingMachine className="w-6 h-6" />;
  if (
    slug.includes("sanitary") ||
    slug.includes("bidet") ||
    full.includes("wash basins")
  )
    return <Droplets className="w-6 h-6" />;
  if (slug.includes("laptop") || slug.includes("computer"))
    return <Laptop className="w-6 h-6" />;
  if (slug.includes("beauty") || slug.includes("health"))
    return <Heart className="w-6 h-6" />;

  // ✅ Default fallback
  return <ShoppingBag className="w-6 h-6" />;
};

const getCategoryGradient = (category: ApiCategory) => {
  const slug = category?.slug.toLowerCase();
  const full = (category?.full_path || "").toLowerCase();

  if (slug.includes("electrical") || full.includes("electrical"))
    return "from-blue-500/20 to-blue-600/10";
  if (slug.includes("lighting") || slug.includes("led"))
    return "from-yellow-500/20 to-yellow-600/10";
  if (slug.includes("fan")) return "from-purple-500/20 to-purple-600/10";
  if (slug.includes("sanitary") || slug.includes("bidet"))
    return "from-teal-500/20 to-teal-600/10";
  if (slug.includes("mobile") || slug.includes("phone"))
    return "from-indigo-500/20 to-indigo-600/10";

  return "from-slate-500/20 to-slate-600/10";
};

const CategoryDisplay: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const { data: categories } = useCategories();

  // ✅ Show only ACTIVE + MAIN categories
  const mainCategories = useMemo(() => {
    const arr = Array.isArray(categories) ? (categories as ApiCategory[]) : [];
    return arr.filter((c) => c?.is_active && c?.category_type === "LEAF");
  }, [categories]);

  console.log(mainCategories,"main")

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = 300;
    const newPosition =
      direction === "left"
        ? scrollPosition - scrollAmount
        : scrollPosition + scrollAmount;

    scrollContainerRef.current.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
    setScrollPosition(newPosition);
  };

  return (
    <section className="w-full bg-linear-to-br from-[#0B0B0D] via-[#0B0B0D] to-[#0B0B0D] py-14 md:py-10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-white font-medium text-xl sm:text-2xl lg:text-2xl tracking-tight">
              Shop by Category
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Discover our curated collection
            </p>
          </div>

          {/* Desktop Navigation Arrows */}
          <div className="hidden lg:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-slate-800/50 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-all duration-300 group"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-slate-800/50 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-all duration-300 group"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto overflow-y-hidden py-1 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="flex gap-3 lg:gap-5 w-max px-1">
            {mainCategories.map((category, index) => {
              const gradient = getCategoryGradient(category);

              return (
                <button
                  key={category.id}
                  onClick={() => navigate(`/filter/${category?.slug}`)}
                  className="
    group
    relative
    shrink-0
    w-[88px] h-[104px]
    sm:w-[108px] sm:h-[124px]
    lg:w-[128px] lg:h-[144px]
    focus:outline-none
  "
                  style={{
                    animation: `fadeInUp 0.45s cubic-bezier(.22,.61,.36,1) ${
                      index * 0.07
                    }s both`,
                  }}
                >
                  <div
                    className="
      relative h-full w-full
      rounded-3xl
      bg-linear-to-br from-slate-800/50 to-slate-900/60
      border border-slate-700/50
      backdrop-blur-md
      shadow-lg
      transition-all duration-300
      group-hover:scale-[1.04]
      group-hover:border-blue-500/50
      group-hover:shadow-blue-500/25
      overflow-hidden
      flex flex-col items-center justify-center
      px-3 py-4
    "
                  >
                    {/* Hover Gradient */}
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />

                    {/* Soft Shine */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-y-0 left-0 w-1/2 bg-linear-to-r from-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center gap-2 text-center">
                      {/* Image / Icon */}
                      <div
                        className="
          relative
          h-20 w-20
          sm:h-16 sm:w-16
          lg:h-20 lg:w-20
          rounded-2xl
          bg-slate-800/60
          border border-slate-700/50
          shadow-md
          flex items-center justify-center
          overflow-hidden
          transition-transform duration-300
          group-hover:scale-110 group-hover:rotate-2  
        "
                      >
                        {category?.image ? (
                          <>
                            <img
                              src={category?.image}
                              alt={category?.name}
                              loading="lazy"
                              className="
                h-full w-full
                object-contain
                transition-transform duration-300
                group-hover:scale-105
              "
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                          </>
                        ) : (
                          <div className="text-slate-300 group-hover:text-white transition-colors duration-300 scale-110">
                            {getCategoryIcon(category)}
                          </div>
                        )}
                      </div>

                      {/* Name */}
                      <p
                        className="
          text-[11px] sm:text-xs
          font-medium
          text-slate-200
          group-hover:text-white
          transition-colors duration-300
          leading-snug
          line-clamp-2
          max-w-28
        "
                      >
                        {category.name}
                      </p>
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 h-12 w-12 bg-linear-to-br from-blue-500/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Scroll Hint */}
        <div className="lg:hidden flex items-center justify-center gap-2 mt-6 text-slate-500 text-xs animate-pulse">
          <ChevronLeft className="w-4 h-4" />
          <span>Swipe to explore more</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default CategoryDisplay;
