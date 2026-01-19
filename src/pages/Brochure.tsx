import React, { useMemo, useState } from "react";
import { Download, FileText, Search, ExternalLink } from "lucide-react";

type BrochureCategory =
  | "All"
  | "TV"
  | "Refrigerator"
  | "Washing Machine"
  | "Air Conditioner"
  | "Mobile"
  | "Wiring & Cables"
  | "Fans"
  | "Sanitaryware";

type BrochureItem = {
  id: string;
  title: string;
  brand: string;
  category: Exclude<BrochureCategory, "All">;
  year: number;
  sizeMB: number;
  pages: number;
  format: "PDF";
  description: string;
  tags: string[];
  brochureUrl: string; // ✅ your pdf url
};

const BROCHURES: BrochureItem[] = [
  {
    id: "b1",
    title: "Premium LED TV Collection 2026",
    brand: "INDO",
    category: "TV",
    year: 2026,
    sizeMB: 8.4,
    pages: 24,
    format: "PDF",
    description:
      "Explore 4K UHD, Mini-LED, Smart TV features, and pricing tiers in one brochure.",
    tags: ["4K", "Smart TV", "HDR"],
    brochureUrl: "/brochures/tv-collection-2026.pdf",
  },
  {
    id: "b2",
    title: "Energy Efficient Refrigerators",
    brand: "INDO",
    category: "Refrigerator",
    year: 2026,
    sizeMB: 6.1,
    pages: 18,
    format: "PDF",
    description:
      "Frost-free, inverter technology, storage layouts, and recommended models.",
    tags: ["Inverter", "Frost Free", "5 Star"],
    brochureUrl: "/brochures/refrigerator-energy-efficient.pdf",
  },
  {
    id: "b3",
    title: "Electrical Wiring & Power Catalog",
    brand: "INDO",
    category: "Wiring & Cables",
    year: 2025,
    sizeMB: 4.7,
    pages: 32,
    format: "PDF",
    description:
      "Armoured cables, flexible cables, wiring safety, and installation guidance.",
    tags: ["Armoured", "Flexible", "Safety"],
    brochureUrl: "/brochures/wiring-power-catalog.pdf",
  },
  {
    id: "b4",
    title: "Fans & Appliances Lookbook",
    brand: "INDO",
    category: "Fans",
    year: 2026,
    sizeMB: 5.2,
    pages: 20,
    format: "PDF",
    description:
      "Designer fans, performance series, sweep sizes, and smart controls.",
    tags: ["BLDC", "Remote", "Premium"],
    brochureUrl: "/brochures/fans-appliances-2026.pdf",
  },
];

const categories: BrochureCategory[] = [
  "All",
  "TV",
  "Refrigerator",
  "Washing Machine",
  "Air Conditioner",
  "Mobile",
  "Wiring & Cables",
  "Fans",
  "Sanitaryware",
];

type SortMode = "Newest" | "Oldest" | "A-Z" | "Size (Small)" | "Size (Large)";

const Brochure: React.FC = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<BrochureCategory>("All");
  const [sortMode, setSortMode] = useState<SortMode>("Newest");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = BROCHURES.filter((b) => {
      const matchesQuery =
        !q ||
        b.title.toLowerCase().includes(q) ||
        b.brand.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q));

      const matchesCategory =
        activeCategory === "All" ? true : b.category === activeCategory;

      return matchesQuery && matchesCategory;
    });

    list = [...list].sort((a, b) => {
      switch (sortMode) {
        case "Newest":
          return b.year - a.year;
        case "Oldest":
          return a.year - b.year;
        case "A-Z":
          return a.title.localeCompare(b.title);
        case "Size (Small)":
          return a.sizeMB - b.sizeMB;
        case "Size (Large)":
          return b.sizeMB - a.sizeMB;
        default:
          return 0;
      }
    });

    return list;
  }, [query, activeCategory, sortMode]);

  const totalCount = BROCHURES.length;

  return (
    <div className="min-h-screen bg-[#070709] text-white">
      {/* TOP HERO */}
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <div className="absolute -top-28 -left-28 h-80 w-80 rounded-full bg-red-500/20 blur-3xl" />
          <div className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-10">
          <div className="flex flex-col gap-2">
            <p className="text-xs tracking-widest text-white/60">
              HOME / RESOURCES / BROCHURES
            </p>

            <h1 className="text-2xl md:text-4xl font-extrabold leading-tight">
              Download Product Brochures
            </h1>

            <p className="max-w-2xl text-sm md:text-base text-white/70">
              Get the latest brochures for TVs, appliances, wiring solutions and
              more — designed for quick product comparison and easy sharing.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
              {/* SEARCH */}
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl shadow-xl">
                <Search className="h-5 w-5 text-white/60" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search brochures by name, brand, category, tags..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
                />
              </div>

              {/* CATEGORY */}
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl shadow-xl">
                <select
                  value={activeCategory}
                  onChange={(e) =>
                    setActiveCategory(e.target.value as BrochureCategory)
                  }
                  className="w-full bg-transparent text-sm outline-none text-white"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-[#0B0B0D]">
                      {c}
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
                  {[
                    "Newest",
                    "Oldest",
                    "A-Z",
                    "Size (Small)",
                    "Size (Large)",
                  ].map((s) => (
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
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="mx-auto max-w-7xl px-4 py-10">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-lg font-bold">No brochures found</p>
            <p className="mt-2 text-sm text-white/60">
              Try a different keyword or select another category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((b) => (
              <div
                key={b.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/6 to-transparent p-5 shadow-2xl transition hover:border-red-500/40"
              >
                {/* top glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                  <div className="absolute -top-20 -left-20 h-48 w-48 rounded-full bg-red-500/15 blur-3xl" />
                </div>

                {/* card content */}
                <div className="relative flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                        <FileText className="h-6 w-6 text-white/80" />
                      </div>

                      <div>
                        <p className="text-xs text-white/60">{b.brand}</p>
                        <h3 className="text-base font-extrabold leading-tight">
                          {b.title}
                        </h3>
                      </div>
                    </div>

                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
                      {b.format}
                    </span>
                  </div>

                  <p className="text-sm text-white/65 line-clamp-2">
                    {b.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                      {b.category}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                      {b.year}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                      {b.pages} pages
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                      {b.sizeMB.toFixed(1)} MB
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {b.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70"
                      >
                        {t}
                      </span>
                    ))}
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

                  <div className="pt-2 text-xs text-white/45">
                    Tip: Share the preview link with customers instantly.
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FOOTER NOTE */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm font-bold">Need a product-specific brochure?</p>
          <p className="mt-1 text-sm text-white/60">
            You can add brochures per product (or per category) from the admin
            panel and display them here automatically.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Brochure;
