import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { useSearch } from "../hooks/useSearch";
import { useCategories } from "../hooks/useCategories";

import { Search, Tag, Layers, ShoppingBag } from "lucide-react";

const POPULAR_SEARCHES = [
  "Electrical Wires",
  "Aromoured Cables",
  "LED Bulbs",
  "Fans",
  "Switches",
  "Sanitaryware",
  "Bidet Seats",
  "Inverter Refrigerator",
  "Smart TV",
];


const buildMultiLeafUrl = (leafSlugs: string[]) => {
  // /filter?leaf=slug1&leaf=slug2
  const params = new URLSearchParams();
  leafSlugs.forEach((s) => params.append("leaf", s));
  return `/filter?${params.toString()}`;
};

const SearchDropdown: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: categories } = useCategories();
const popularSearches = categories?.slice(0, 10) || [];



  console.log(popularSearches,"pop");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const debounced = useDebounce(query, 350);
  const { data, isFetching } = useSearch(debounced);

  // ✅ close dropdown on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // ✅ click outside close
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!open) return;
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const hasResults = useMemo(() => {
    if (!data) return false;
    return (
      data.products.length > 0 ||
      data.brands.length > 0 ||
      data.categories.main.length > 0 ||
      data.categories.sub.length > 0 ||
      data.categories.leaf.length > 0
    );
  }, [data]);

  const handleLeafRedirect = (leafSlug: string) => {
    setOpen(false);
    setQuery("");
    navigate(`/filter/${leafSlug}`);
  };

  const handleMainOrSubRedirect = (leafSlugs: string[] | undefined) => {
    if (!leafSlugs || leafSlugs.length === 0) return;

    setOpen(false);
    setQuery("");

    // ✅ if only one leaf → direct
    if (leafSlugs.length === 1) {
      navigate(`/filter/${leafSlugs[0]}`);
      return;
    }

    // ✅ multiple leafs → go to combined filter page
    navigate(buildMultiLeafUrl(leafSlugs));
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* INPUT */}
      <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 pr-11 text-sm font-medium text-[#0B0B0D]">
        <Search className="h-5 w-5 text-gray-500" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search products, categories, brands..."
          className="w-full bg-transparent outline-none placeholder:text-gray-400"
        />
        {isFetching && (
          <span className="text-xs text-gray-500 font-semibold">
            Searching...
          </span>
        )}
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute left-0 right-0 top-[110%] z-50 overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B0D] shadow-2xl">
          {/* suggestions */}

          {/* ✅ POPULAR SEARCHES (Show on focus when query is empty) */}
          {query.trim().length === 0 && (
            <div className="p-4">
              <p className="text-xs font-bold text-white/60 mb-3">
                Popular Searches
              </p>

              <div className="flex flex-wrap gap-2">
                {Array.isArray(popularSearches) && popularSearches.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => navigate(`/filter/${c.slug}`)}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white hover:bg-white/10 transition"
                  >
                    {c.name}
                  </button>
                ))}
              </div>

              <p className="mt-4 text-xs text-white/40">
                Start typing to see product and category suggestions.
              </p>
            </div>
          )}

          {/* Empty state */}
          {query.trim().length >= 2 && !isFetching && !hasResults && (
            <div className="p-5 text-sm text-white/70">
              No results found for{" "}
              <span className="text-white font-semibold">{query}</span>
            </div>
          )}

          {/* Results */}
          {query.trim().length >= 2 && data && hasResults && (
            <div className="max-h-[420px] overflow-auto">
              {/* PRODUCTS */}
              {data.products.length > 0 && (
                <div className="p-3">
                  <div className="flex items-center gap-2 px-2 py-2 text-xs font-bold text-white/60">
                    <ShoppingBag className="h-4 w-4" />
                    PRODUCTS
                  </div>

                  <div className="space-y-2">
                    {data.products.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          // ✅ You said final destination is leaf filter
                          // So redirect to leaf category page
                          const leafSlug = p.leaf_category?.slug;
                          if (leafSlug) handleLeafRedirect(leafSlug);
                        }}
                        className="w-full flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-left hover:bg-white/10 transition"
                      >
                        <div className="h-12 w-12 rounded-xl bg-black/30 border border-white/10 overflow-hidden flex items-center justify-center">
                          {p.image ? (
                            <img
                              src={p.image}
                              alt={p.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="text-xs text-white/50">
                              No Image
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-white line-clamp-1">
                            {p.name}
                          </p>
                          <p className="text-xs text-white/60 line-clamp-1">
                            {p.brand?.name || "Brand"} •{" "}
                            {p.leaf_category?.name || "Category"}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-extrabold text-white">
                            ₹{Number(p.price).toLocaleString("en-IN")}
                          </p>
                          {p.old_price && (
                            <p className="text-xs text-white/40 line-through">
                              ₹{Number(p.old_price).toLocaleString("en-IN")}
                            </p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* LEAF CATEGORIES */}
              {data.categories.leaf.length > 0 && (
                <div className="p-3 border-t border-white/10">
                  <div className="flex items-center gap-2 px-2 py-2 text-xs font-bold text-white/60">
                    <Tag className="h-4 w-4" />
                    LEAF CATEGORIES
                  </div>

                  <div className="space-y-2">
                    {data.categories.leaf.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleLeafRedirect(c.slug)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left hover:bg-white/10 transition"
                      >
                        <p className="text-sm font-semibold text-white">
                          {c.name}
                        </p>
                        {c.full_path && (
                          <p className="text-xs text-white/50 line-clamp-1">
                            {c.full_path}
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* MAIN + SUB CATEGORIES */}
              {(data.categories.main.length > 0 ||
                data.categories.sub.length > 0) && (
                <div className="p-3 border-t border-white/10">
                  <div className="flex items-center gap-2 px-2 py-2 text-xs font-bold text-white/60">
                    <Layers className="h-4 w-4" />
                    MAIN / SUB CATEGORIES
                  </div>

                  <div className="space-y-2">
                    {[...data.categories.main, ...data.categories.sub].map(
                      (c) => (
                        <button
                          key={c.id}
                          onClick={() => handleMainOrSubRedirect(c.leaf_slugs)}
                          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left hover:bg-white/10 transition"
                        >
                          <p className="text-sm font-semibold text-white">
                            {c.name}
                            <span className="ml-2 text-xs text-white/50">
                              ({c.category_type})
                            </span>
                          </p>

                          <p className="text-xs text-white/50">
                            Redirects to {c.leaf_slugs?.length || 0} leaf
                            categories
                          </p>
                        </button>
                      ),
                    )}
                  </div>
                </div>
              )}

              {/* BRANDS */}
              {data.brands.length > 0 && (
                <div className="p-3 border-t border-white/10">
                  <div className="px-2 py-2 text-xs font-bold text-white/60">
                    BRANDS
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {data.brands.map((b) => (
                      <button
                        key={b.id}
                        onClick={() => {
                          // ✅ Brand click → you want ultimately products listing
                          // Best: redirect to a filter page that supports brand query
                          navigate(
                            `/filter?brand=${encodeURIComponent(b.name)}`,
                          );
                          setOpen(false);
                          setQuery("");
                        }}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white hover:bg-white/10 transition"
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
