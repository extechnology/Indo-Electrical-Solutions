import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ShieldCheck,
  BadgePercent,
  Truck,
  ArrowRight,
  Star,
} from "lucide-react";
import { useProducts } from "../hooks/useProducts";
import { useBrands } from "../hooks/useBrands";
import { useBanners } from "../hooks/useBanners";
import type { HomeBanner } from "../types";

const formatINR = (value: number) =>
  value.toLocaleString("en-IN", { maximumFractionDigits: 0 });

const calcDiscountPercent = (oldPrice?: number, price?: number) => {
  if (!oldPrice || !price) return null;
  if (oldPrice <= price) return null;
  const p = Math.round(((oldPrice - price) / oldPrice) * 100);
  return p > 0 ? p : null;
};

type Brand = {
  id: number;
  name: string;
  logo: string | null;
  is_active: boolean;
};

type Product = {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: string; // backend string
  old_price?: string | null;
  is_exclusive: boolean;
  is_active: boolean;
  brand?: Brand | null;
};

const Exclusive: React.FC = () => {
  const { data: products = [] } = useProducts();
  const { data: brands = [] } = useBrands();
  const { data: banners = [] } = useBanners();
  console.log(banners, "banners");
  const [isMobile, setIsMobile] = useState(false);

  const exclusiveBanner: HomeBanner | undefined = useMemo(() => {
    const type = isMobile ? "EXCLUSIVE_MOBILE" : "EXCLUSIVE";

    return banners?.find(
      (b: HomeBanner) => b.banner_type === type && b.is_active,
    );
  }, [banners, isMobile]);

  // const [activeTab, setActiveTab] = useState<
  //   "Featured" | "New Launches" | "Top Deals"
  // >("Featured");

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");

    const handleChange = () => setIsMobile(media.matches);

    handleChange();
    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  // ✅ Brand filter (top strip)
  const [activeBrandId, setActiveBrandId] = useState<number | "ALL">("ALL");

  // ✅ 1) Get ONLY exclusive products from API
  const exclusiveProducts = useMemo(() => {
    return (products as Product[])
      .filter((p) => p.is_active && p.is_exclusive)
      .filter((p) => {
        if (activeBrandId === "ALL") return true;
        return p.brand?.id === activeBrandId;
      })
      .map((p) => ({
        ...p,
        priceNumber: Number(p.price || 0),
        oldPriceNumber: p.old_price ? Number(p.old_price) : undefined,
      }));
  }, [products, activeBrandId]);

  // ✅ 2) Dynamic Brand Strip (only brands which have exclusive products)

  const highlights = [
    {
      title: "Exclusive Offers",
      desc: "Limited deals available only on Exclusive.",
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      title: "Genuine Products",
      desc: "100% authentic & verified products with warranty.",
      icon: <ShieldCheck className="w-5 h-5" />,
    },
    {
      title: "Mega Discounts",
      desc: "Save more with exclusive pricing & combo offers.",
      icon: <BadgePercent className="w-5 h-5" />,
    },
    {
      title: "Fast Delivery",
      desc: "Quick shipping with safe packaging & tracking.",
      icon: <Truck className="w-5 h-5" />,
    },
  ];

  const WHATSAPP_NUMBER = "917664939393"; // ✅ your number with country code (no +)

  const buildWhatsAppLink = (product: any) => {
    const message = `Hi, I am interested in this product:\n\n${product.name}\n\nProduct ID: ${product.id}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };
  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white">
      {/* ✅ HERO BANNER */}
      <section className="relative w-full overflow-hidden rounded-b-3xl border border-white/10">
        <img
          src={exclusiveBanner?.image}
          className="w-full  object-cover"
          alt="Exclusive Banner"
        />
        {/* <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-black/10" />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#E02C2C]/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" /> */}

        <div className="absolute  inset-0 flex items-center">
          <div className="w-full px-5 sm:px-8 md:px-10 py-6">
            {/* <div className="max-w-7xl mx-auto md:px-5 py-15 ">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-xl">
                <span className="h-2 w-2 rounded-full bg-[#E02C2C]" />
                Exclusive Deals • Limited Time
              </div>

              <h1 className="mt-4 text-2xl sm:text-4xl md:text-5xl font-medium leading-tight tracking-tight text-white">
                Upgrade Your Home with <br />
                <span className="text-[#E02C2C]">Premium Savings</span>
              </h1>

              <p className="mt-3 text-sm sm:text-base md:text-lg text-white/75 max-w-xl">
                Discover exclusive electronics, lighting, and electrical
                essentials with special prices and fast delivery.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
                <button className="rounded-xl bg-[#E02C2C] px-6 py-3 text-sm font-medium text-white hover:bg-[#B91C1C] transition">
                  Shop Exclusive
                </button>

                <button className="rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-sm font-medium text-white hover:bg-white/15 transition backdrop-blur-xl">
                  View Offers & Schemes
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* ✅ HIGHLIGHTS */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl border border-white/10 bg-black/30 flex items-center justify-center text-white">
                  {h.icon}
                </div>
                <div>
                  <p className="text-sm font-bold">{h.title}</p>
                  <p className="text-xs text-white/60 mt-1">{h.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ DYNAMIC BRANDS STRIP */}
      <section className="mx-auto max-w-7xl px-4 pb-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-white/60 font-semibold tracking-wide">
                EXCLUSIVE BRANDS
              </p>
              <h2 className="mt-1 text-base md:text-lg font-semibold">
                Shop by Brand
              </h2>
            </div>

            {/* Optional small counter */}
            <span className="hidden sm:inline-flex rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70">
              {brands?.length || 0} Brands
            </span>
          </div>

          {/* ✅ Scrollable Strip */}
          <div className="mt-4 overflow-x-auto pb-2">
            <div className="flex w-max gap-3">
              {/* ✅ All Button */}
              {/* <button
                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 hover:bg-white/10 transition min-w-[150px]"
                onClick={() => setActiveBrandId("ALL")}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <span className="text-sm font-bold text-white/80">All</span>
                </div>

                <div className="text-left">
                  <p className="text-sm font-bold text-white">All Brands</p>
                  <p className="text-[11px] text-white/50">View everything</p>
                </div>
              </button> */}

              {/* ✅ Brands */}
              {brands?.map((brand: Brand) => (
                <button
                  key={brand.id}
                  className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 hover:bg-white/10 transition min-w-[180px]"
                  onClick={() => setActiveBrandId(brand.id)}
                >
                  {/* ✅ Logo */}
                  <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                    {brand.logo ? (
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="h-full w-full object-contain p-2"
                        loading="lazy"
                      />
                    ) : (
                      <div className="text-xs font-bold text-white/70">
                        {brand.name?.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* ✅ Name */}
                  <div className="text-left">
                    <p className="text-sm font-bold text-white group-hover:text-white transition">
                      {brand.name}
                    </p>
                    <p className="text-[11px] text-white/50">
                      Explore exclusives
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ✅ PRODUCTS + TABS */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-medium">
              Exclusive Picks for You
            </h2>
            <p className="text-sm text-white/60 mt-1">
              Showing {exclusiveProducts.length} exclusive products.
            </p>
          </div>

          {/* Tabs (you can connect later) */}
          {/* <div className="flex gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
            {(["Featured", "New Launches", "Top Deals"] as const).map((t) => {
              const active = t === activeTab;
              return (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                    active
                      ? "bg-[#E02C2C] text-white"
                      : "text-white/70 hover:bg-white/10"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div> */}
        </div>

        {/* ✅ Products Grid */}
        {exclusiveProducts.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-lg font-bold">No exclusive products found</p>
            <p className="mt-2 text-sm text-white/60">
              Try selecting another brand.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exclusiveProducts.map((p) => {
              const discount = calcDiscountPercent(
                p.oldPriceNumber,
                p.priceNumber,
              );

              return (
                <div
                  key={p.id}
                  className="group rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative w-full flex justify-center overflow-hidden bg-white">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-70 object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-xs text-white/60 font-semibold">
                      {p.brand?.name || "Brand"}
                    </p>

                    <h3 className="mt-1 text-sm font-bold leading-snug line-clamp-2">
                      {p.name}
                    </h3>

                    <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/30 px-3 py-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        4.0
                      </span>
                      <span className="text-white/50">Exclusive Verified</span>
                    </div>

                    {p.priceNumber != null && p.priceNumber > 0 && (
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <span className="text-2xl font-medium tracking-tight text-white">
                          ₹{formatINR(p.priceNumber)}
                        </span>

                        {!!p.oldPriceNumber && p.oldPriceNumber > 0 && (
                          <span className="text-sm text-white/40 line-through">
                            ₹{formatINR(p.oldPriceNumber)}
                          </span>
                        )}

                        {discount != null && discount > 0 && (
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-white">
                            {discount}% Off
                          </span>
                        )}
                      </div>
                    )}

                    

                    <div className="mt-5  mb-3 w-full">
                      <a
                        href={buildWhatsAppLink(p)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full rounded-lg bg-linear-to-r from-red-500/80 to-red-500/40 px-4 py-3 text-sm font-bold text-white hover:bg-[#B91C1C] transition"
                      >
                        Order Now
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ✅ LIMITED TIME DEALS */}
      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="rounded-3xl border border-white/10 bg-linear-to-r from-white/5 to-transparent p-6 md:p-10 overflow-hidden relative">
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-red-500/15 blur-3xl" />

          <div className="relative">
            <p className="text-xs font-semibold text-white/60">
              LIMITED TIME DEALS
            </p>

            <h3 className="mt-2 text-2xl md:text-3xl font-medium">
              Save Big on Premium Picks
            </h3>

            <p className="mt-3 max-w-2xl text-sm md:text-base text-white/60">
              Extra discounts on selected categories. Offers refresh frequently.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/offers-and-schemes"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition"
              >
                Explore Offers <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Exclusive;
