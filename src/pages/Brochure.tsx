import React, { useMemo, useState } from "react";
import { Download, FileText, Search, ExternalLink } from "lucide-react";
import { useBrands } from "../hooks/useBrands";

type SortMode = "Newest" | "Oldest" | "A-Z";

type BrandBrochure = {
  id: number;
  category: number;
  category_name: string;
  title: string | null;
  brochure_file: string;
  is_active: boolean;
};

type Brand = {
  id: number;
  name: string;
  logo: string | null;
  is_active: boolean;
  brochures: BrandBrochure[];
};

type UiBrochureItem = {
  id: string;
  title: string;
  brandName: string;
  brandLogo?: string | null;

  categoryName: string;
  brochureUrl: string;
};

const Brochure: React.FC = () => {
  const { data: brands = [], isLoading } = useBrands();

  const [query, setQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [sortMode, setSortMode] = useState<SortMode>("Newest");

  // ✅ Flatten brands -> brochures list (dynamic)
  const allBrochures: UiBrochureItem[] = useMemo(() => {
    return (brands as Brand[])
      .filter((brand) => brand.is_active)
      .flatMap((brand) =>
        (brand.brochures || [])
          .filter((b) => b.is_active)
          .map((b) => ({
            id: `${brand.id}-${b.id}`,
            title: b.title || `${brand.name} - ${b.category_name} Brochure`,
            brandName: brand.name,
            categoryName: b.category_name,
            brandLogo: brand.logo,
            brochureUrl: b.brochure_file,
          })),
      );
  }, [brands]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = allBrochures.filter((b) => {
      const matchesQuery =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.brandName.toLowerCase().includes(q) ||
        b.categoryName.toLowerCase().includes(q);

      const matchesBrand =
        selectedBrand === "All" ? true : b.brandName === selectedBrand;

      return matchesQuery && matchesBrand;
    });

    list = [...list].sort((a, b) => {
      switch (sortMode) {
        case "A-Z":
          return a.title.localeCompare(b.title);
        case "Oldest":
          return a.id.localeCompare(b.id);
        case "Newest":
        default:
          return b.id.localeCompare(a.id);
      }
    });

    return list;
  }, [allBrochures, query, selectedBrand, sortMode]);

  const totalCount = allBrochures.length;

  return (
    <div className="min-h-screen bg-[#070709] text-white">
      {/* TOP HERO */}
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <div className="absolute -top-28 -left-28 h-80 w-80 rounded-full bg-red-500/20 blur-3xl" />
          <div className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-10">
          <div className="flex flex-col gap-2">
            <p className="text-xs tracking-widest text-white/60">
              HOME / RESOURCES / BROCHURES
            </p>

            <h1 className="text-2xl md:text-4xl font-medium leading-tight">
              Download Product Brochures
            </h1>

            <p className="max-w-2xl text-sm md:text-base text-white/70">
              Browse brand-wise brochures and download them instantly.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
              {/* SEARCH */}
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl shadow-xl">
                <Search className="h-5 w-5 text-white/60" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by brochure name, brand, category..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
                />
              </div>

              {/* ✅ BRAND DROPDOWN */}
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl shadow-xl">
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none text-white"
                >
                  <option value="All" className="bg-[#0B0B0D]">
                    All Brands
                  </option>

                  {(brands as Brand[])
                    .filter((b) => b.is_active)
                    .map((b) => (
                      <option
                        key={b.id}
                        value={b.name}
                        className="bg-[#0B0B0D]"
                      >
                        {b.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* SORT */}
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl shadow-xl">
                <select
                  value={sortMode}
                  onChange={(e) => setSortMode(e.target.value as SortMode)}
                  className="w-full bg-transparent text-sm outline-none text-white"
                >
                  {["Newest", "Oldest", "A-Z"].map((s) => (
                    <option key={s} value={s} className="bg-[#0B0B0D]">
                      Sort: {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* STATS */}
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/60">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Total brochures:{" "}
                <span className="text-white">{totalCount}</span>
              </span>

              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Showing: <span className="text-white">{filtered.length}</span>
              </span>

              {query.trim() && (
                <button
                  onClick={() => setQuery("")}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10 transition"
                >
                  Clear Search
                </button>
              )}
            </div>

            {isLoading && (
              <p className="mt-3 text-sm text-white/60">Loading brochures...</p>
            )}
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="mx-auto max-w-7xl px-4 py-10">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-lg font-bold">No brochures found</p>
            <p className="mt-2 text-sm text-white/60">
              Try another brand or search keyword.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((b) => (
              <div
                key={b.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-linear-to-b from-white/6 to-transparent p-5 shadow-2xl transition hover:border-red-500/40"
              >
                {/* top glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                  <div className="absolute -top-20 -left-20 h-48 w-48 rounded-full bg-red-500/15 blur-3xl" />
                </div>

                {/* card content */}
                <div className="relative flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                        {b.brandLogo ? (
                          <img
                            src={b.brandLogo}
                            alt={b.brandName}
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <FileText className="h-6 w-6 text-white/80" />
                        )}
                      </div>

                      <div>
                        <p className="text-xs text-white/60">{b.brandName}</p>
                        <h3 className="text-base font-medium leading-tight">
                          {b.title}
                        </h3>
                        <p className="mt-1 text-xs text-white/50">
                          Category: {b.categoryName}
                        </p>
                      </div>
                    </div>

                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
                      PDF
                    </span>
                  </div>

                  <div className="mt-2 grid grid-cols-2 gap-3">
                    {/* Download */}
                    <a
                      href={b.brochureUrl}
                      download
                      className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#E02C2C] px-4 py-3 text-sm font-bold text-white hover:bg-[#B91C1C] transition"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </a>

                    {/* Preview */}
                    <a
                      href={b.brochureUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white hover:bg-white/10 transition"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Preview
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Brochure;
