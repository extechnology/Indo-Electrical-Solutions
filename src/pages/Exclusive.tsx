import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ShieldCheck,
  BadgePercent,
  Truck,
  ArrowRight,
  Star,
  Zap,
} from "lucide-react";

type ExclusiveProduct = {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  badge?: string;
  brand?: string;
  exclusive?: boolean;
};

const formatINR = (value: number) =>
  value.toLocaleString("en-IN", { maximumFractionDigits: 0 });

const calcDiscountPercent = (oldPrice?: number, price?: number) => {
  if (!oldPrice || !price) return null;
  if (oldPrice <= price) return null;
  const p = Math.round(((oldPrice - price) / oldPrice) * 100);
  return p > 0 ? p : null;
};

const Exclusive: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "Featured" | "New Launches" | "Top Deals"
  >("Featured");

  // ✅ Replace with API later (exclusive flag)
  const exclusiveProducts: ExclusiveProduct[] = useMemo(
    () => [
      {
        id: 1,
        name: 'INDO Smart LED TV 55" 4K UHD (Dolby Vision, 120Hz)',
        slug: "indo-smart-led-tv-55",
        image:
          "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1200&auto=format&fit=crop",
        price: 42999,
        oldPrice: 53999,
        rating: 4.4,
        badge: "Exclusive Price",
        brand: "INDO",
        exclusive: true,
      },
      {
        id: 2,
        name: "INDO Premium Refrigerator 350L (Inverter, 5 Star)",
        slug: "indo-premium-refrigerator-350l",
        image:
          "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?q=80&w=1200&auto=format&fit=crop",
        price: 31999,
        oldPrice: 39999,
        rating: 4.2,
        badge: "Limited Stock",
        brand: "INDO",
        exclusive: true,
      },
      {
        id: 3,
        name: "INDO BLDC Ceiling Fan (Remote, Silent Mode)",
        slug: "indo-bldc-ceiling-fan",
        image:
          "https://images.unsplash.com/photo-1616627547584-bf28cee262db?q=80&w=1200&auto=format&fit=crop",
        price: 2999,
        oldPrice: 3799,
        rating: 4.6,
        badge: "Top Rated",
        brand: "INDO",
        exclusive: true,
      },
      {
        id: 4,
        name: "INDO Wiring Power Kit (Copper, Heavy Duty)",
        slug: "indo-wiring-power-kit",
        image:
          "https://images.unsplash.com/photo-1581093804475-577d72e38aa0?q=80&w=1200&auto=format&fit=crop",
        price: 1999,
        oldPrice: 2499,
        rating: 4.3,
        badge: "Hot Deal",
        brand: "INDO",
        exclusive: true,
      },
      {
        id: 5,
        name: "INDO LED Bulb Pack (9W x 6, Bright White)",
        slug: "indo-led-bulb-pack",
        image:
          "https://images.unsplash.com/photo-1512218168353-4e9a6f3b1f46?q=80&w=1200&auto=format&fit=crop",
        price: 499,
        oldPrice: 699,
        rating: 4.1,
        badge: "Combo Offer",
        brand: "INDO",
        exclusive: true,
      },
      {
        id: 6,
        name: "INDO Smartphone Pro (8GB/128GB, 5G, AMOLED)",
        slug: "indo-smartphone-pro",
        image:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
        price: 18999,
        oldPrice: 21999,
        rating: 4.0,
        badge: "New Launch",
        brand: "INDO",
        exclusive: true,
      },
    ],
    [],
  );

  const brandStrip = [
    "INDO",
    "Havells",
    "Philips",
    "Syska",
    "Wipro",
    "Crompton",
  ];

  const highlights = [
    {
      title: "Exclusive Offers",
      desc: "Limited deals available only on INDO Exclusive.",
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

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white">
      {/* ✅ HERO BANNER */}
      

      <section>
        <div>
            <img src="/banner.jpg" className="w-full h-96 object-cover" alt="" />
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

      {/* ✅ BRANDS STRIP */}
      <section className="mx-auto max-w-7xl px-4 pb-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs text-white/60 font-semibold">Trusted Brands</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {brandStrip.map((b) => (
              <span
                key={b}
                className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-bold text-white/80 hover:bg-white/10 transition"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ PRODUCTS + TABS */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold">
              Exclusive Picks for You
            </h2>
            <p className="text-sm text-white/60 mt-1">
              Premium products curated for maximum value.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
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
          </div>
        </div>

        {/* Products Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {exclusiveProducts.map((p) => {
            const discount = calcDiscountPercent(p.oldPrice, p.price);

            return (
              <Link
                to={`/product/${p.slug}`}
                key={p.id}
                className="group rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-56 w-full overflow-hidden bg-black/30">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                  />

                  {p.badge && (
                    <div className="absolute top-3 left-3 rounded-full bg-[#E02C2C] px-4 py-2 text-xs font-extrabold">
                      {p.badge}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-xs text-white/60 font-semibold">
                    {p.brand || "Brand"}
                  </p>

                  <h3 className="mt-1 text-sm font-bold leading-snug line-clamp-2">
                    {p.name}
                  </h3>

                  {/* Rating */}
                  <div className="mt-3 flex items-center gap-2 text-xs text-white/70">
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/30 px-3 py-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      {p.rating?.toFixed(1) ?? "4.0"}
                    </span>
                    <span className="text-white/50">Exclusive Verified</span>
                  </div>

                  {/* Price */}
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className="text-2xl font-extrabold">
                      ₹{formatINR(p.price)}
                    </span>

                    {p.oldPrice && (
                      <span className="text-sm text-white/40 line-through">
                        ₹{formatINR(p.oldPrice)}
                      </span>
                    )}

                    {discount !== null && (
                      <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-bold text-white/80">
                        {discount}% Off
                      </span>
                    )}
                  </div>

                  <div className="mt-5">
                    <button className="w-full rounded-lg bg-[#E02C2C] px-4 py-3 text-sm font-bold text-white hover:bg-[#B91C1C] transition">
                      View Product
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ✅ LIMITED TIME DEALS */}
      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="rounded-3xl border border-white/10 bg-linear-to-r from-white/5 to-transparent p-6 md:p-10 overflow-hidden relative">
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-red-500/15 blur-3xl" />

          <div className="relative">
            <p className="text-xs font-semibold text-white/60">
              LIMITED TIME DEALS
            </p>

            <h3 className="mt-2 text-2xl md:text-3xl font-extrabold">
              Save Big on Premium Picks
            </h3>

            <p className="mt-3 max-w-2xl text-sm md:text-base text-white/60">
              Extra discounts on selected categories. Offers refresh frequently.
              Grab them before they expire.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/offers"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black px-6 py-3 text-sm font-extrabold hover:bg-white/90 transition"
              >
                Explore Offers <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/30 px-6 py-3 text-sm font-extrabold text-white hover:bg-white/10 transition"
              >
                Browse All Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Exclusive;
