import React, { useEffect, useMemo, useRef, useState } from "react";

type Product = {
  id: string;
  name: string;
};

type SubCategory = {
  id: string;
  name: string;
  products: Product[];
};

type Category = {
  id: string;
  name: string;
  subCategories: SubCategory[];
};

type MenuGroup = {
  id: string;
  title: string;
  items: {
    id: string;
    name: string;
    subItems: {
      id: string;
      name: string;
      products: Product[];
    }[];
  }[];
};


const ArrowRightIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={`h-4 w-4 ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

const MenuIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={`h-5 w-5 ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const CloseIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={`h-5 w-5 ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const SearchIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={`h-5 w-5 ${className}`}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const Navbar: React.FC = () => {
  // =========================
  // THEME (INDO)
  // =========================
  // Background: #0B0B0D
  // Surface:    #121216
  // Border:     #2A2C33
  // Primary:    #E02C2C
  // Muted:      #9AA3AF
  // White:      #FFFFFF

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const menuBtnRef = useRef<HTMLButtonElement | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const [activeGroupId, setActiveGroupId] = useState<string | null>(
    "exclusive"
  );
  const [activeGroupItemId, setActiveGroupItemId] = useState<string | null>(
    null
  );
  const [activeGroupSubItemId, setActiveGroupSubItemId] = useState<
    string | null
  >(null);


  // For desktop hover panels
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activeSubCategoryId, setActiveSubCategoryId] = useState<string | null>(
    null
  );

  // For mobile drill-down
  const [mobileStep, setMobileStep] = useState<
    "CATEGORIES" | "SUBS" | "PRODUCTS"
  >("CATEGORIES");

  const [mobileCategoryId, setMobileCategoryId] = useState<string | null>(null);
  const [mobileSubCategoryId, setMobileSubCategoryId] = useState<string | null>(
    null
  );

  const categories: Category[] = useMemo(
    () => [
      {
        id: "home-appliances",
        name: "Home Appliances",
        subCategories: [
          {
            id: "washing",
            name: "Washing Machines & Dryers",
            products: [
              { id: "p1", name: "Front Load Washing Machines" },
              { id: "p2", name: "Top Load Washing Machines" },
              { id: "p3", name: "Washer Dryers" },
              { id: "p4", name: "Semi Automatic Washing Machines" },
            ],
          },
          {
            id: "ac",
            name: "Air Conditioners",
            products: [
              { id: "p1", name: "Split AC" },
              { id: "p2", name: "Window AC" },
              { id: "p3", name: "Inverter AC" },
              { id: "p4", name: "Smart AC" },
            ],
          },
          {
            id: "refrigerators",
            name: "Refrigerators & Freezers",
            products: [
              { id: "p1", name: "Single Door Refrigerators" },
              { id: "p2", name: "Double Door Refrigerators" },
              { id: "p3", name: "Side-by-Side Refrigerators" },
              { id: "p4", name: "Deep Freezers" },
            ],
          },
          {
            id: "fans",
            name: "Fans",
            products: [
              { id: "p1", name: "Ceiling Fans" },
              { id: "p2", name: "Table Fans" },
              { id: "p3", name: "Pedestal Fans" },
              { id: "p4", name: "Wall Fans" },
            ],
          },
        ],
      },
      {
        id: "lighting",
        name: "Lighting Products",
        subCategories: [
          {
            id: "bulbs",
            name: "LED Bulbs",
            products: [
              { id: "p1", name: "9W LED Bulb" },
              { id: "p2", name: "12W LED Bulb" },
              { id: "p3", name: "Smart LED Bulbs" },
              { id: "p4", name: "Emergency Bulbs" },
            ],
          },
          {
            id: "tubes",
            name: "LED Tube Lights",
            products: [
              { id: "p1", name: "T5 Tube Lights" },
              { id: "p2", name: "T8 Tube Lights" },
              { id: "p3", name: "Batten Lights" },
              { id: "p4", name: "Panel Lights" },
            ],
          },
          {
            id: "decor",
            name: "Decor & Smart Lights",
            products: [
              { id: "p1", name: "Smart Strip Lights" },
              { id: "p2", name: "Smart Ceiling Lights" },
              { id: "p3", name: "Outdoor Smart Lights" },
              { id: "p4", name: "Festoon Lights" },
            ],
          },
        ],
      },
      {
        id: "electrical",
        name: "Electrical Equipments",
        subCategories: [
          {
            id: "switches",
            name: "Switches & Sockets",
            products: [
              { id: "p1", name: "Modular Switches" },
              { id: "p2", name: "Extension Boards" },
              { id: "p3", name: "Smart Plugs" },
              { id: "p4", name: "USB Sockets" },
            ],
          },
          {
            id: "cables",
            name: "Wires & Cables",
            products: [
              { id: "p1", name: "House Wiring Cables" },
              { id: "p2", name: "Flexible Wires" },
              { id: "p3", name: "Industrial Cables" },
              { id: "p4", name: "Coaxial Cables" },
            ],
          },
          {
            id: "protection",
            name: "Protection Devices",
            products: [
              { id: "p1", name: "MCB" },
              { id: "p2", name: "RCCB" },
              { id: "p3", name: "Surge Protectors" },
              { id: "p4", name: "Fuse Units" },
            ],
          },
        ],
      },
      {
        id: "kitchen",
        name: "Kitchen Appliances",
        subCategories: [
          {
            id: "mixers",
            name: "Mixer Grinders",
            products: [
              { id: "p1", name: "500W Mixer Grinder" },
              { id: "p2", name: "750W Mixer Grinder" },
              { id: "p3", name: "Juicer Mixer Grinder" },
              { id: "p4", name: "Food Processor" },
            ],
          },
          {
            id: "microwave",
            name: "Microwave Ovens",
            products: [
              { id: "p1", name: "Solo Microwave" },
              { id: "p2", name: "Grill Microwave" },
              { id: "p3", name: "Convection Microwave" },
              { id: "p4", name: "Built-in Microwave" },
            ],
          },
        ],
      },
      {
        id: "computers",
        name: "Computers & Tablets",
        subCategories: [
          {
            id: "laptops",
            name: "Laptops",
            products: [
              { id: "p1", name: "Gaming Laptops" },
              { id: "p2", name: "Thin & Light Laptops" },
              { id: "p3", name: "Business Laptops" },
              { id: "p4", name: "Student Laptops" },
            ],
          },
          {
            id: "tablets",
            name: "Tablets",
            products: [
              { id: "p1", name: "Android Tablets" },
              { id: "p2", name: "iPad" },
              { id: "p3", name: "Learning Tablets" },
              { id: "p4", name: "Kids Tablets" },
            ],
          },
        ],
      },
    ],
    []
  );

  const exclusiveLinks = useMemo(
    () => [
      { id: "ex1", label: "Exclusive at INDO" },
      { id: "ex2", label: "Top Brands" },
      { id: "ex3", label: "Store Locator" },
      { id: "ex4", label: "Gift Card" },
    ],
    []
  );

const menuGroups: MenuGroup[] = [
  {
    id: "exclusive",
    title: "Exclusive at INDO",
    items: [
      {
        id: "exclusive-offers",
        name: "Exclusive Offers",
        subItems: [
          {
            id: "seasonal-offers",
            name: "Seasonal Deals",
            products: [
              { id: "p1", name: "Festival Combo Packs" },
              { id: "p2", name: "Lighting Discounts" },
            ],
          },
        ],
      },
      {
        id: "indo-services",
        name: "INDO Services",
        subItems: [
          {
            id: "support",
            name: "Support & Repair",
            products: [
              { id: "p1", name: "Installation Service" },
              { id: "p2", name: "Repair Service" },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "brands",
    title: "Top Brands",
    items: [
      {
        id: "premium-brands",
        name: "Premium Brands",
        subItems: [
          {
            id: "brand-list",
            name: "Brands",
            products: [
              { id: "p1", name: "Havells" },
              { id: "p2", name: "Syska" },
              { id: "p3", name: "Philips" },
              { id: "p4", name: "Anchor" },
            ],
          },
        ],
      },
      {
        id: "budget-brands",
        name: "Budget Brands",
        subItems: [
          {
            id: "budget-list",
            name: "Brands",
            products: [
              { id: "p1", name: "Wipro" },
              { id: "p2", name: "Crompton" },
            ],
          },
        ],
      },
    ],
  },
];



  const activeCategory = useMemo(
    () => categories.find((c) => c.id === activeCategoryId) || categories[0],
    [categories, activeCategoryId]
  );

  const activeSubCategory = useMemo(() => {
    if (!activeCategory) return null;
    return (
      activeCategory.subCategories.find((s) => s.id === activeSubCategoryId) ||
      activeCategory.subCategories[0]
    );
  }, [activeCategory, activeSubCategoryId]);

  // When opening menu, pick first default items
  useEffect(() => {
    if (menuOpen) {
      setActiveCategoryId(categories[0]?.id ?? null);
      setActiveSubCategoryId(categories[0]?.subCategories?.[0]?.id ?? null);
      setMobileStep("CATEGORIES");
      setMobileCategoryId(null);
      setMobileSubCategoryId(null);
    }
  }, [menuOpen, categories]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!menuOpen) return;

      const target = e.target as Node;

      // If click is inside dropdown → do nothing
      if (dropdownRef.current && dropdownRef.current.contains(target)) return;

      // If click is on menu button → do nothing (toggle will handle)
      if (menuBtnRef.current && menuBtnRef.current.contains(target)) return;

      // Else close menu
      setMenuOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);


  // ESC close
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  // Helpers for mobile drilldown
  const mobileCategory = useMemo(
    () => categories.find((c) => c.id === mobileCategoryId) || null,
    [categories, mobileCategoryId]
  );

  const mobileSubCategory = useMemo(() => {
    if (!mobileCategory) return null;
    return (
      mobileCategory.subCategories.find((s) => s.id === mobileSubCategoryId) ||
      null
    );
  }, [mobileCategory, mobileSubCategoryId]);

  return (
    <div className="w-full">
      {/* TOP NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#0B0B0D] border-b border-[#2A2C33]">
        <div className="mx-auto max-w-7xl px-4 py-2">
          <div className="flex h-16 items-center gap-3 ">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#121216] border border-[#2A2C33]">
                <img src="/INDO_logo.png" alt="" />
              </div>
            </div>

            {/* Menu Button */}
            <button
              ref={menuBtnRef}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="ml-2 inline-flex items-center gap-2 rounded-xl border border-[#2A2C33] bg-[#121216] px-3 py-2 text-sm font-semibold text-white hover:border-[#E02C2C] transition"
              aria-expanded={menuOpen}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
              <span className="hidden sm:inline">Menu</span>
            </button>

            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <input
                  placeholder="What are you looking for?"
                  className="w-full rounded-xl bg-white px-4 py-2.5 pr-11 text-sm font-medium text-[#0B0B0D] outline-none ring-0 placeholder:text-gray-400"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-[#E02C2C] p-2 text-white hover:bg-[#B91C1C] transition"
                  aria-label="Search"
                >
                  <SearchIcon />
                </button>
              </div>
            </div>

            {/* Right side actions (optional) */}
            {/* <div className="hidden md:flex items-center gap-2">
              <button className="rounded-xl border border-[#2A2C33] bg-[#121216] px-3 py-2 text-sm font-semibold text-white hover:border-[#E02C2C] transition">
                Login
              </button>
              <button className="rounded-xl bg-[#E02C2C] px-3 py-2 text-sm font-semibold text-white hover:bg-[#B91C1C] transition">
                Cart
              </button>
            </div> */}
          </div>
        </div>

        {/* DROPDOWN WRAPPER */}
        {menuOpen && (
          <div ref={dropdownRef} className="relative">
            {/* Dark overlay */}
            <div
              className="fixed inset-0 bg-black/60"
              onClick={() => setMenuOpen(false)}
            />

            {/* Dropdown panel */}
            <div className="absolute left-0 right-0 top-0 z-50">
              <div className="mx-auto max-w-7xl px-4 pb-4">
                <div className="mt-3 overflow-hidden rounded-2xl border border-[#2A2C33] bg-[#0B0B0D] shadow-2xl">
                  {/* Desktop Layout */}
                  <div className="hidden lg:grid lg:grid-cols-[360px_1fr_1fr]">
                    {/* LEFT COLUMN */}
                    <div className="border-r border-[#2A2C33] bg-[#121216]">
                      {/* Exclusive */}
                      <div className="p-4">
                        <div className="rounded-xl border border-[#2A2C33] bg-[#0B0B0D] overflow-hidden">
                          {menuGroups.map((group) => {
                            const active = group.id === activeGroupId;

                            return (
                              <button
                                key={group.id}
                                onMouseEnter={() => {
                                  setActiveGroupId(group.id);
                                  setActiveGroupItemId(
                                    group.items[0]?.id ?? null
                                  );
                                  setActiveGroupSubItemId(
                                    group.items[0]?.subItems[0]?.id ?? null
                                  );
                                }}
                                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold border-b border-[#2A2C33]
      ${active ? "bg-[#E02C2C] text-white" : "text-white hover:bg-white/5"}`}
                              >
                                <span>{group.title}</span>
                                <ArrowRightIcon
                                  className={
                                    active ? "text-white" : "text-[#9AA3AF]"
                                  }
                                />
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Categories */}
                      <div className="px-4 pb-4">
                        <p className="text-white font-extrabold text-base mb-3">
                          Shop by Category
                        </p>
                        <div className="rounded-xl border border-[#2A2C33] bg-[#0B0B0D] overflow-hidden">
                          {categories.map((cat) => {
                            const active = cat.id === activeCategoryId;
                            return (
                              <button
                                key={cat.id}
                                onMouseEnter={() => {
                                  setActiveCategoryId(cat.id);
                                  setActiveSubCategoryId(
                                    cat.subCategories[0]?.id ?? null
                                  );
                                }}
                                className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold transition border-b border-[#2A2C33] last:border-b-0
                                ${
                                  active
                                    ? "bg-[#E02C2C] text-white"
                                    : "text-white hover:bg-white/5"
                                }`}
                              >
                                <span>{cat.name}</span>
                                <ArrowRightIcon
                                  className={`${
                                    active ? "text-white" : "text-[#9AA3AF]"
                                  }`}
                                />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* MIDDLE COLUMN (Sub Categories) */}
                    <div className="border-r border-[#2A2C33] bg-[#0B0B0D]">
                      <div className="p-4">
                        <p className="text-white font-extrabold text-base mb-3">
                          {activeCategory?.name || "Category"}
                        </p>

                        <div className="rounded-xl border border-[#2A2C33] bg-[#121216] overflow-hidden">
                          {activeCategory?.subCategories?.map((sub) => {
                            const active = sub.id === activeSubCategoryId;
                            return (
                              <button
                                key={sub.id}
                                onMouseEnter={() =>
                                  setActiveSubCategoryId(sub.id)
                                }
                                className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold transition border-b border-[#2A2C33] last:border-b-0
                                ${
                                  active
                                    ? "bg-white/5 text-white"
                                    : "text-white hover:bg-white/5"
                                }`}
                              >
                                <span>{sub.name}</span>
                                <ArrowRightIcon className="text-[#9AA3AF]" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT COLUMN (Products) */}
                    <div className="bg-[#0B0B0D]">
                      <div className="p-4">
                        <p className="text-white font-extrabold text-base mb-3">
                          {activeSubCategory?.name || "Products"}
                        </p>

                        <div className="rounded-xl border border-[#2A2C33] bg-[#121216] p-3">
                          <div className="grid grid-cols-1 gap-2">
                            {activeSubCategory?.products?.map((p) => (
                              <button
                                key={p.id}
                                className="rounded-xl border border-transparent bg-[#0B0B0D] px-4 py-3 text-left text-sm font-semibold text-white hover:border-[#E02C2C] hover:bg-white/5 transition"
                              >
                                {p.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <p className="text-xs text-[#9AA3AF]">
                            Showing products for{" "}
                            <span className="text-white">
                              {activeSubCategory?.name}
                            </span>
                          </p>
                          <button className="text-sm font-bold text-[#E02C2C] hover:text-white transition">
                            View All
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile / Tablet Layout */}
                  <div className="lg:hidden">
                    <div className="flex items-center justify-between border-b border-[#2A2C33] bg-[#121216] px-4 py-3">
                      <div>
                        <p className="text-white font-extrabold text-base">
                          Menu
                        </p>
                        <p className="text-xs text-[#9AA3AF]">
                          Browse categories and products
                        </p>
                      </div>
                      <button
                        onClick={() => setMenuOpen(false)}
                        className="rounded-xl border border-[#2A2C33] bg-[#0B0B0D] p-2 text-white hover:border-[#E02C2C] transition"
                      >
                        <CloseIcon />
                      </button>
                    </div>

                    {/* Quick Links */}
                    <div className="p-4">
                      <div className="rounded-xl border border-[#2A2C33] bg-[#121216] overflow-hidden">
                        {exclusiveLinks.map((x) => (
                          <button
                            key={x.id}
                            className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-white hover:bg-white/5 transition border-b border-[#2A2C33] last:border-b-0"
                          >
                            <span>{x.label}</span>
                            <ArrowRightIcon className="text-[#9AA3AF]" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Mobile Drill Down */}
                    <div className="px-4 pb-4">
                      <p className="text-white font-extrabold text-base mb-3">
                        Shop by Category
                      </p>

                      {/* STEP 1: Categories */}
                      {mobileStep === "CATEGORIES" && (
                        <div className="rounded-xl border border-[#2A2C33] bg-[#0B0B0D] overflow-hidden">
                          {categories.map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => {
                                setMobileCategoryId(cat.id);
                                setMobileStep("SUBS");
                              }}
                              className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-white hover:bg-white/5 transition border-b border-[#2A2C33] last:border-b-0"
                            >
                              <span>{cat.name}</span>
                              <ArrowRightIcon className="text-[#9AA3AF]" />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* STEP 2: Sub Categories */}
                      {mobileStep === "SUBS" && mobileCategory && (
                        <div className="rounded-xl border border-[#2A2C33] bg-[#0B0B0D] overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A2C33] bg-[#121216]">
                            <button
                              onClick={() => setMobileStep("CATEGORIES")}
                              className="text-sm font-bold text-[#E02C2C] hover:text-white transition"
                            >
                              ← Back
                            </button>
                            <span className="text-sm font-extrabold text-white">
                              {mobileCategory.name}
                            </span>
                            <span className="w-12" />
                          </div>

                          {mobileCategory.subCategories.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => {
                                setMobileSubCategoryId(sub.id);
                                setMobileStep("PRODUCTS");
                              }}
                              className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-white hover:bg-white/5 transition border-b border-[#2A2C33] last:border-b-0"
                            >
                              <span>{sub.name}</span>
                              <ArrowRightIcon className="text-[#9AA3AF]" />
                            </button>
                          ))}
                        </div>
                      )}

                      {/* STEP 3: Products */}
                      {mobileStep === "PRODUCTS" &&
                        mobileCategory &&
                        mobileSubCategory && (
                          <div className="rounded-xl border border-[#2A2C33] bg-[#0B0B0D] overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A2C33] bg-[#121216]">
                              <button
                                onClick={() => setMobileStep("SUBS")}
                                className="text-sm font-bold text-[#E02C2C] hover:text-white transition"
                              >
                                ← Back
                              </button>
                              <span className="text-sm font-extrabold text-white">
                                {mobileSubCategory.name}
                              </span>
                              <span className="w-12" />
                            </div>

                            <div className="p-3 bg-[#121216]">
                              <div className="grid grid-cols-1 gap-2">
                                {mobileSubCategory.products.map((p) => (
                                  <button
                                    key={p.id}
                                    className="rounded-xl border border-[#2A2C33] bg-[#0B0B0D] px-4 py-3 text-left text-sm font-semibold text-white hover:border-[#E02C2C] hover:bg-white/5 transition"
                                  >
                                    {p.name}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="px-4 py-3 border-t border-[#2A2C33] bg-[#0B0B0D] flex justify-end">
                              <button className="rounded-xl bg-[#E02C2C] px-4 py-2 text-sm font-bold text-white hover:bg-[#B91C1C] transition">
                                View All
                              </button>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
