import React, { useState } from "react";
import {
  Laptop,
  Tv,
  WashingMachine,
  Smartphone,
  CookingPot,
  Lightbulb,
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type CategoryItem = {
  id: number;
  name: string;
  icon: React.ReactNode;
  color: string;
};

const categoryData: CategoryItem[] = [
  {
    id: 1,
    name: "Home Appliances",
    icon: <WashingMachine className="w-8 h-8" />,
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    id: 2,
    name: "Lighting Products",
    icon: <Lightbulb className="w-8 h-8" />,
    color: "from-yellow-500/20 to-yellow-600/10",
  },
  {
    id: 3,
    name: "Electrical Equipments",
    icon: <Tv className="w-8 h-8" />,
    color: "from-purple-500/20 to-purple-600/10",
  },
  {
    id: 4,
    name: "Garden & Outdoor",
    icon: <Laptop className="w-8 h-8" />,
    color: "from-green-500/20 to-green-600/10",
  },
  {
    id: 5,
    name: "Health & Beauty",
    icon: <Heart className="w-8 h-8" />,
    color: "from-pink-500/20 to-pink-600/10",
  },
  {
    id: 6,
    name: "Stationery",
    icon: <Laptop className="w-8 h-8" />,
    color: "from-orange-500/20 to-orange-600/10",
  },
  {
    id: 7,
    name: "Kitchen Appliances",
    icon: <CookingPot className="w-8 h-8" />,
    color: "from-red-500/20 to-red-600/10",
  },
  {
    id: 8,
    name: "Computers & Tablets",
    icon: <Laptop className="w-8 h-8" />,
    color: "from-cyan-500/20 to-cyan-600/10",
  },
  {
    id: 9,
    name: "Smart Phones",
    icon: <Smartphone className="w-8 h-8" />,
    color: "from-indigo-500/20 to-indigo-600/10",
  },
];

const CategoryDisplay: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
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
    }
  };

  return (
    <section className="w-full bg-linear-to-br from-black via-slate-950 to-black py-12 md:py-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight">
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
              className="p-3 rounded-full bg-slate-800/50 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-all duration-300 group"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-full bg-slate-800/50 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-all duration-300 group"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        {/* Categories Grid/Scroll Container */}
        <div className="relative">
          {/* Desktop: linear fade edges */}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto overflow-y-hidden scrollbar-hide pb-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div className="flex gap-4 lg:gap-6 w-max px-1">
              {categoryData.map((category, index) => (
                <button
                  key={category.id}
                  className="group relative shrink-0 w-[140px] h-[140px] sm:w-[160px] sm:h-[160px]"
                  style={{
                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                  }}
                >
                  <div
                    className="
      h-full w-full
      relative overflow-hidden rounded-2xl
      bg-linear-to-br from-slate-800/40 to-slate-900/40
      backdrop-blur-sm border border-slate-700/50
      transition-all duration-500
      hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50
      flex items-center justify-center
      p-5
    "
                  >
                    {/* Hover Gradient */}
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    {/* Shine */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center">
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-800/50 group-hover:bg-slate-700/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <div className="text-slate-300 group-hover:text-white transition-colors duration-300">
                          {category.icon}
                        </div>
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition-colors duration-300 leading-snug line-clamp-2">
                        {category.name}
                      </p>
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-14 h-14 bg-linear-to-br from-blue-500/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Scroll Hint */}
          <div className="lg:hidden flex items-center justify-center gap-2 mt-6 text-slate-500 text-xs animate-pulse">
            <ChevronLeft className="w-4 h-4" />
            <span>Swipe to explore more</span>
            <ChevronRight className="w-4 h-4" />
          </div>
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
