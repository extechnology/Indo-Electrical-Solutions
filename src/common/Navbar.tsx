import React, { useEffect, useMemo, useRef, useState } from "react";
import { useCategories } from "../hooks/useCategories";
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import SearchDropdown from "./SearchDropDown";

// type Product = {
//   id: string;
//   name: string;
// };

// type MenuGroup = {
//   id: string;
//   title: string;
//   items: {
//     id: string;
//     name: string;
//     subItems: {
//       id: string;
//       name: string;
//       products: Product[];
//     }[];
//   }[];
// };

type ApiCategory = {
  id: number;
  name: string;
  slug: string;
  parent: number | null;
  is_active: boolean;
  category_type?: "MAIN" | "SUB" | "LEAF";
  full_path?: string;
};

type NavCategory = {
  id: number;
  name: string;
  slug: string;
  children: NavCategory[];
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

const navItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Indo Exclusive",
    link: "/exclusive",
  },
  {
    name: "Top Brands",
    link: "/brands",
  },
  {
    name: "Offers & Schemes",
    link: "/offers-and-schemes",
  },
  {
    name: "Downloads",
    link: "/brochure",
  },
];

const Navbar: React.FC = () => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const menuBtnRef = useRef<HTMLButtonElement | null>(null);
  const { data: categories } = useCategories();
  // const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [showNavbar, setShowNavbar] = useState(true);

  const [searchExpanded,setSearchExpanded] = useState(false);

  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  // const [activeGroupItemId, setActiveGroupItemId] = useState<string | null>(
  //   null,
  // );
  const [activeGroupSubItemId, setActiveGroupSubItemId] = useState<
    string | null
  >(null);
  console.log(activeGroupSubItemId);

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activeSubCategoryId, setActiveSubCategoryId] = useState<string | null>(
    null,
  );

  const [mobileStep, setMobileStep] = useState<
    "CATEGORIES" | "SUBS" | "PRODUCTS"
  >("CATEGORIES");

  const [mobileCategoryId, setMobileCategoryId] = useState<string | null>(null);
  const [mobileSubCategoryId, setMobileSubCategoryId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;

      // Always show near top
      if (currentY <= 50) {
        setShowNavbar(true);
        lastY = currentY;
        return;
      }

      // scroll down => hide
      if (currentY > lastY + 10) {
        setShowNavbar(false);
      }

      // scroll up => show
      if (currentY < lastY - 10) {
        setShowNavbar(true);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) setShowNavbar(true);
  }, [menuOpen]);

  const buildCategoryTree = (data: ApiCategory[] = []) => {
    const map = new Map<number, NavCategory>();

    data.forEach((c) => {
      map.set(c.id, { id: c.id, name: c.name, slug: c.slug, children: [] });
    });

    const roots: NavCategory[] = [];

    data.forEach((c) => {
      const node = map.get(c.id);
      if (!node) return;

      if (c.parent === null) {
        roots.push(node);
      } else {
        const parent = map.get(c.parent);
        if (parent) parent.children.push(node);
      }
    });

    return roots;
  };

  const categoriesTree = useMemo(() => {
    const activeOnly = (categories || []).filter(
      (c: ApiCategory) => c.is_active,
    );
    return buildCategoryTree(activeOnly);
  }, [categories]);

  const mainCategories = categoriesTree;

  const activeMainCategory = useMemo(() => {
    return (
      mainCategories.find((c) => String(c.id) === activeCategoryId) ||
      mainCategories[0] ||
      null
    );
  }, [mainCategories, activeCategoryId]);

  const subCategories = activeMainCategory?.children || [];

  const activeSubCategory = useMemo(() => {
    return (
      subCategories.find((s) => String(s.id) === activeSubCategoryId) ||
      subCategories[0] ||
      null
    );
  }, [subCategories, activeSubCategoryId]);

  const leafCategories = activeSubCategory?.children || [];

  useEffect(() => {
    // ✅ Close dropdown on navigation
    setMenuOpen(false);

    // ✅ Optional: reset category hover states (clean UX)
    setActiveCategoryId(null);
    setActiveSubCategoryId(null);

    setActiveGroupId(null);
    // setActiveGroupItemId(null);
    setActiveGroupSubItemId(null);

    // ✅ Optional: reset mobile step if you use it
    setMobileStep("CATEGORIES");
    setMobileCategoryId(null);
    setMobileSubCategoryId(null);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    if (!mainCategories.length) return;

    const firstMain = mainCategories[0];
    const firstSub = firstMain?.children?.[0];

    setMobileCategoryId(String(firstMain.id));
    setMobileSubCategoryId(firstSub ? String(firstSub.id) : null);

    setMobileStep("SUBS");
  }, [menuOpen, mainCategories]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!menuOpen) return;

      const target = e.target as Node;

      if (dropdownRef.current && dropdownRef.current.contains(target)) return;
      if (menuBtnRef.current && menuBtnRef.current.contains(target)) return;

      setMenuOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const mobileMainCategory = useMemo(() => {
    return (
      mainCategories.find((c) => String(c.id) === mobileCategoryId) || null
    );
  }, [mainCategories, mobileCategoryId]);

  const mobileSubCategory = useMemo(() => {
    if (!mobileMainCategory) return null;
    return (
      mobileMainCategory.children.find(
        (s) => String(s.id) === mobileSubCategoryId,
      ) || null
    );
  }, [mobileMainCategory, mobileSubCategoryId]);

  const mobileLeafCategories = mobileSubCategory?.children || [];

  return (
    <div className="w-full">
      <header
        className={`
    fixed top-0 left-0 right-0 z-50
    bg-[#0B0B0D] border-b border-[#2A2C33]
    transition-transform duration-300 ease-in-out
    ${showNavbar ? "translate-y-0" : "-translate-y-full"}
  `}
      >
        {" "}
        <div className="mx-auto max-w-7xl px-4 py-2 h-[80px]">
          <div className="flex h-16 items-center gap-3 ">
            <div className="flex items-center gap-3">
              <Link to="/">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl">
                  <img src="/indo_logo2.png" alt="" />
                </div>
              </Link>
            </div>

            <button
              ref={menuBtnRef}
              type="button"
              onClick={() => {
                setMenuOpen((v) => {
                  const next = !v;
                  if (!next) {
                    setMobileStep("CATEGORIES");
                    setMobileCategoryId(null);
                    setMobileSubCategoryId(null);
                  }
                  return next;
                });
              }}
              className="ml-2 inline-flex items-center gap-2 rounded-xl border border-[#2A2C33] bg-[#121216] px-3 py-2 text-sm font-medium text-white hover:border-[#E02C2C] transition"
              aria-expanded={menuOpen}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
              <span className="hidden sm:inline">Menu</span>
            </button>

            {/* NavLinks + Search row */}
            <div className="hidden md:flex flex-1 items-center gap-3 overflow-visible">
              {/* Navlinks container */}
              <div
                className={`
      flex items-center  justify-center gap-2 bg-white/5 border border-white/10 px-3 rounded-xl backdrop-blur-xl shadow-lg
      transition-all duration-300
      ${searchExpanded ? "flex-[0.65]" : "flex-1"}
    `}
              >
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.link}
                    className={({ isActive }) =>
                      `relative px-4 my-2 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap
          ${
            isActive
              ? "text-white shadow-md"
              : "text-white/70 hover:text-white hover:bg-white/5"
          }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.name}
                        {isActive && (
                          <span className="absolute left-3 right-3 -bottom-[2px] h-[0.5px] rounded-full bg-[#E02C2C]" />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>

              {/* Search container */}
              <div
                className={`
      transition-all duration-300
      ${searchExpanded ? "flex-[0.35]" : "flex-none"}
    `}
              >
                <SearchDropdown
                  expanded={searchExpanded}
                  setExpanded={setSearchExpanded}
                />
              </div>
            </div>
          </div>
        </div>
        {menuOpen && (
          <div ref={dropdownRef} className="relative">
            <div
              className="fixed inset-0 bg-black/60"
              onClick={() => setMenuOpen(false)}
            />

            <div className="absolute left-0 right-0 top-0 z-50">
              <div className="mx-auto max-w-7xl px-4 pb-4">
                <div className="mt-3 overflow-hidden rounded-xl border border-[#2A2C33] bg-[#0B0B0D] shadow-2xl">
                  <div className="hidden lg:grid lg:grid-cols-[360px_1fr_1fr]">
                    <div className="border-r border-[#2A2C33] bg-[#121216]">
                      <div className="p-4">
                        {/* <div className="rounded-lg border border-[#2A2C33] bg-[#0B0B0D] overflow-hidden">
                          {menuGroups.map((group) => {
                            const active = group.id === activeGroupId;

                            return (
                              <button
                                key={group.id}
                                onMouseEnter={() => {
                                  setActiveGroupId(group.id);
                                  setActiveGroupItemId(
                                    group.items[0]?.id ?? null,
                                  );
                                  setActiveGroupSubItemId(
                                    group.items[0]?.subItems[0]?.id ?? null,
                                  );
                                  setActiveCategoryId(null);
                                  setActiveSubCategoryId(null);
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
                        </div> */}
                      </div>

                      {/* Main Category */}
                      <div className="px-4 pb-4">
                        <p className="text-white font-extrabold text-base mb-3">
                          Shop by Category
                        </p>
                        <div className="rounded-lg border border-[#2A2C33] bg-[#0B0B0D] overflow-hidden">
                          {mainCategories.map((cat) => {
                            const active = String(cat.id) === activeCategoryId;

                            return (
                              <button
                                key={cat.id}
                                onMouseEnter={() => {
                                  setActiveCategoryId(String(cat.id));
                                  setActiveSubCategoryId(
                                    String(cat.children[0]?.id ?? ""),
                                  );
                                  setActiveGroupId(null);
                                  // setActiveGroupItemId(null);
                                  setActiveGroupSubItemId(null);
                                }}
                                className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold transition border-b border-[#2A2C33] last:border-b-0
        ${active ? "bg-[#E02C2C] text-white" : "text-white hover:bg-white/5"}`}
                              >
                                <span>{cat.name}</span>
                                <ArrowRightIcon
                                  className={`${active ? "text-white" : "text-[#9AA3AF]"}`}
                                />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Sub Category */}
                    <div className="border-r border-[#2A2C33] bg-[#0B0B0D]">
                      <div className="p-4">
                        {activeGroupId ? (
                          <>
                            {/* <p className="text-white font-extrabold text-base mb-3">
                              {menuGroups.find((g) => g.id === activeGroupId)
                                ?.title || "Group"}
                            </p> */}

                            {/* <div className="rounded-lg border border-[#2A2C33] bg-[#121216] overflow-hidden">
                              {menuGroups
                                .find((g) => g.id === activeGroupId)
                                ?.items.map((item) => {
                                  const active = item.id === activeGroupItemId;
                                  return (
                                    <button
                                      key={item.id}
                                      onMouseEnter={() => {
                                        setActiveGroupItemId(item.id);
                                        setActiveGroupSubItemId(
                                          item.subItems[0]?.id ?? null,
                                        );
                                      }}
                                      className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold transition border-b border-[#2A2C33] last:border-b-0 
                                        ${active ? "bg-white/5 text-white" : "text-white hover:bg-white/5"}`}
                                    >
                                      <span>{item.name}</span>
                                      <ArrowRightIcon className="text-[#9AA3AF]" />
                                    </button>
                                  );
                                })}
                            </div> */}
                          </>
                        ) : (
                          <>
                            <p className="text-white font-extrabold text-base mb-3">
                              {activeMainCategory?.name || "Category"}
                            </p>

                            <div className="rounded-lg border border-[#2A2C33] bg-[#121216] overflow-hidden">
                              {subCategories.map((sub) => {
                                const active =
                                  String(sub.id) === activeSubCategoryId;

                                return (
                                  <button
                                    key={sub.id}
                                    onMouseEnter={() =>
                                      setActiveSubCategoryId(String(sub.id))
                                    }
                                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold transition border-b border-[#2A2C33] last:border-b-0
        ${active ? "bg-white/5 text-white" : "text-white hover:bg-white/5"}`}
                                  >
                                    <span>{sub.name}</span>
                                    <ArrowRightIcon className="text-[#9AA3AF]" />
                                  </button>
                                );
                              })}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Leaf Category */}
                    <div className="bg-[#0B0B0D]">
                      <div className="p-4">
                        {activeGroupId ? (
                          <>
                            {/* <p className="text-white font-extrabold text-base mb-3">
                              {menuGroups
                                .find((g) => g.id === activeGroupId)
                                ?.items.find((i) => i.id === activeGroupItemId)
                                ?.name || "Items"}
                            </p> */}

                            {/* <div className="rounded-lg border border-[#2A2C33] bg-[#121216] p-3">
                              <div className="grid grid-cols-1 gap-2">
                                {menuGroups
                                  .find((g) => g.id === activeGroupId)
                                  ?.items.find(
                                    (i) => i.id === activeGroupItemId,
                                  )
                                  ?.subItems.flatMap((subItem) =>
                                    subItem.products.map((product) => (
                                      <button
                                        key={product.id}
                                        className="rounded-lg border border-transparent bg-[#0B0B0D] px-4 py-3 text-left text-sm font-semibold text-white hover:border-[#E02C2C] hover:bg-white/5 transition"
                                        onClick={() => {
                                          navigate(`/filter/${product.name}`);
                                        }}
                                      >
                                        {product.name}
                                      </button>
                                    )),
                                  )}
                              </div>
                            </div> */}

                            <div className="mt-3 flex items-center justify-between">
                              <p className="text-xs text-[#9AA3AF]">
                                Showing items for{" "}
                                {/* <span className="text-white">
                                  {
                                    menuGroups
                                      .find((g) => g.id === activeGroupId)
                                      ?.items.find(
                                        (i) => i.id === activeGroupItemId,
                                      )?.name
                                  }
                                </span> */}
                              </p>
                              {/* <button className="text-sm font-bold text-[#E02C2C] hover:text-white transition">
                                View All
                              </button> */}
                            </div>
                          </>
                        ) : (
                          <>
                            <p className="text-white font-extrabold text-base mb-3">
                              {activeSubCategory?.name || "Products"}
                            </p>

                            <div className="rounded-lg border border-[#2A2C33] bg-[#121216] p-3">
                              <div className="grid grid-cols-1 gap-2">
                                {leafCategories.map((leaf) => (
                                  <button
                                    key={leaf.id}
                                    className="rounded-lg border border-transparent bg-[#0B0B0D] px-4 py-3 text-left text-sm font-semibold text-white hover:border-[#E02C2C] hover:bg-white/5 transition"
                                    onClick={() => {
                                      navigate(`/filter/${leaf.slug}`);
                                    }}
                                  >
                                    {leaf.name}
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
                              {/* <button className="text-sm font-bold text-[#E02C2C] hover:text-white transition">
                                View All
                              </button> */}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Mobile Menu */}

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

                    <div className="p-4">
                      <p className="text-white font-extrabold text-base mb-3">
                        Quick Links
                      </p>

                      <div className="rounded-xl border border-[#2A2C33] bg-[#121216] overflow-hidden">
                        {navItems.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.link}
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                              `w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold transition border-b border-[#2A2C33] last:border-b-0
          ${isActive ? "bg-[#E02C2C] text-white" : "text-white hover:bg-white/5"}`
                            }
                          >
                            <span>{item.name}</span>
                            <ArrowRightIcon className="text-[#9AA3AF]" />
                          </NavLink>
                        ))}
                      </div>
                    </div>

                    <div className="px-4 pb-4">
                      <p className="text-white font-extrabold text-base mb-3">
                        Shop by Category
                      </p>

                      {mobileStep === "CATEGORIES" && (
                        <div className="rounded-xl border border-[#2A2C33] bg-[#0B0B0D] overflow-hidden">
                          {mainCategories.map((cat) => (
                            <button
                              key={cat.id}
                              onClick={() => {
                                setMobileCategoryId(String(cat.id));
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

                      {mobileStep === "SUBS" && mobileMainCategory && (
                        <div className="rounded-xl border border-[#2A2C33] bg-[#0B0B0D] overflow-hidden">
                          <div className="flex items-center justify-between px-4 py-3 border-b border-[#2A2C33] bg-[#121216]">
                            <button
                              onClick={() => setMobileStep("CATEGORIES")}
                              className="text-sm font-bold text-[#E02C2C] hover:text-white transition"
                            >
                              ← Back
                            </button>
                            <span className="text-sm font-extrabold text-white">
                              {mobileMainCategory.name}
                            </span>
                            <span className="w-12" />
                          </div>

                          {mobileMainCategory?.children.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => {
                                setMobileSubCategoryId(String(sub.id));
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

                      {mobileStep === "PRODUCTS" &&
                        mobileMainCategory &&
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
                                {mobileLeafCategories.map((leaf) => (
                                  <button
                                    key={leaf.id}
                                    onClick={() => {
                                      navigate(`/filter/${leaf.slug}`);
                                      setMenuOpen(false);
                                    }}
                                    className="rounded-xl border border-[#2A2C33] bg-[#0B0B0D] px-4 py-3 text-left text-sm font-semibold text-white hover:border-[#E02C2C] hover:bg-white/5 transition"
                                  >
                                    {leaf.name}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="px-4 py-3 border-t border-[#2A2C33] bg-[#0B0B0D] flex justify-end">
                              {/* <button className="rounded-xl bg-[#E02C2C] px-4 py-2 text-sm font-bold text-white hover:bg-[#B91C1C] transition">
                                View All
                              </button> */}
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
