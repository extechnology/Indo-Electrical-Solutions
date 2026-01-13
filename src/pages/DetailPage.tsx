import React, { useMemo, useState } from "react";
import {
  Heart,
  Share2,
  Star,
  Truck,
  ShieldCheck,
  BadgePercent,
  CheckCircle2,
} from "lucide-react";

type Offer = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
};

type Product = {
  id: string;
  name: string;
  brand: string;
  categoryTrail: string[];
  images: string[];
  price: number;
  oldPrice?: number;
  rating: number; // 0-5
  ratingCount: number;
  emiText: string;
  highlights: string[];
  overview: string[];
  specifications: { label: string; value: string }[];
  offers: Offer[];
};

const formatINR = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);

const DetailPage: React.FC = () => {
  const product: Product = useMemo(
    () => ({
      id: "p1",
      brand: "Orient",
      name: "Orient Comforter Collection 2900W PTC Fan Oil Filled Radiator Room Heater with 13 Fins (Auto Shut-off)",
      categoryTrail: [
        "Home Appliances",
        "Room Heaters",
        "Oil Filled Radiator (OFR) Room Heater",
      ],
      images: [
        "https://images.unsplash.com/photo-1580915411954-282cb1a5d7b4?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1582582621959-48d27397dc30?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1581091226825-c6a89e7e4801?q=80&w=1200&auto=format&fit=crop",
      ],
      price: 9999,
      oldPrice: 16490,
      rating: 5,
      ratingCount: 1,
      emiText: "₹471/mo*",
      highlights: [
        "Type: PTC Fan Oil Filled Radiator Room Heater",
        "Power Consumption: 2900W",
        "Heating Modes: 3",
        "Over Heat Protection: Yes",
        "Thermostat Control",
      ],
      overview: [
        "The Orient Comforter OFR heater is designed to deliver efficient and steady heating for your room with enhanced safety features.",
        "Oil-filled radiators provide long-lasting warmth and operate silently, making them perfect for bedrooms and living spaces.",
        "The auto shut-off and overheat protection adds extra reliability for daily use.",
      ],
      specifications: [
        { label: "Brand", value: "Orient" },
        { label: "Model", value: "Comforter Collection" },
        { label: "Type", value: "Oil Filled Radiator (OFR)" },
        { label: "Power Consumption", value: "2900W" },
        { label: "Heating Modes", value: "3" },
        { label: "Thermostat", value: "Yes" },
        { label: "Overheat Protection", value: "Yes" },
        { label: "Auto Shut-off", value: "Yes" },
        { label: "Color", value: "Black / Silver" },
        { label: "Ideal For", value: "Bedroom, Living Room, Office" },
      ],
      offers: [
        {
          id: "o1",
          title: "JP_HSBC",
          subtitle: "Instant discount up to ₹7500",
          description:
            "Get instant discount of 7.5% up to ₹7,500 on HSBC Bank Credit Card EMI for cart values above ₹20,000.",
        },
        {
          id: "o2",
          title: "JP_BOB",
          subtitle: "Instant discount on EMI",
          description:
            "₹3,000 instant discount on Bank of Baroda Credit Card EMI with cart value above ₹50,000.",
        },
        {
          id: "o3",
          title: "JP_ICICI",
          subtitle: "Extra savings on select cards",
          description:
            "₹2,500 discount on ICICI card transactions above ₹50,000. Offer under limited period.",
        },
      ],
    }),
    []
  );

  const [activeImg, setActiveImg] = useState(0);
  const [tab, setTab] = useState<"overview" | "specs">("overview");

  const discountPercent = useMemo(() => {
    if (!product.oldPrice) return null;
    const off = Math.round(
      ((product.oldPrice - product.price) / product.oldPrice) * 100
    );
    return off;
  }, [product.oldPrice, product.price]);

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white">
      {/* Page Container */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-white/70">
          {product.categoryTrail.map((c, idx) => (
            <React.Fragment key={c}>
              <span className="hover:text-white cursor-pointer">{c}</span>
              {idx !== product.categoryTrail.length - 1 && (
                <span className="text-white/30">›</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* TOP GRID */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* LEFT: Images */}
          <div className="rounded-2xl border border-[#2A2C33] bg-[#121216] p-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[90px_1fr]">
              {/* Thumbnails */}
              <div className="order-2 sm:order-1">
                <div className="flex gap-3 overflow-x-auto sm:flex-col sm:overflow-visible scrollbar-hide">
                  {product.images.map((img, idx) => (
                    <button
                      key={img}
                      onClick={() => setActiveImg(idx)}
                      className={`shrink-0 rounded-xl border transition ${
                        idx === activeImg
                          ? "border-[#E02C2C] bg-white/5"
                          : "border-[#2A2C33] bg-[#0B0B0D] hover:border-white/20"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`thumb-${idx}`}
                        className="h-20 w-20 object-cover rounded-xl"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Image */}
              <div className="order-1 sm:order-2">
                <div className="relative overflow-hidden rounded-2xl border border-[#2A2C33] bg-[#0B0B0D]">
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/40" />
                  <img
                    src={product.images[activeImg]}
                    alt={product.name}
                    className="h-[340px] w-full object-contain p-6 sm:h-[460px]"
                    draggable={false}
                  />

                  {/* Floating actions */}
                  <div className="absolute right-4 top-4 flex gap-2">
                    <button className="rounded-xl border border-[#2A2C33] bg-black/50 p-2 hover:border-[#E02C2C] transition">
                      <Heart className="h-5 w-5" />
                    </button>
                    <button className="rounded-xl border border-[#2A2C33] bg-black/50 p-2 hover:border-[#E02C2C] transition">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Compare / Store */}
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <label className="flex items-center gap-2 text-sm text-white/80">
                    <input type="checkbox" className="accent-[#E02C2C]" />
                    Compare
                  </label>

                  <button className="inline-flex items-center gap-2 text-sm font-semibold text-[#E02C2C] hover:text-white transition">
                    <ShieldCheck className="h-4 w-4" />
                    Connect to Store
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Details */}
          <div className="rounded-2xl border border-[#2A2C33] bg-[#121216] p-5 sm:p-6">
            <h1 className="text-xl sm:text-xl font-semibold leading-snug">
              {product.name}
            </h1>

            {/* Small badges */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold text-white/90">
                Extra Rs.1000 off on Cart
              </span>
            </div>

            {/* Rating row */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-1 text-[#E02C2C]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.round(product.rating)
                        ? "fill-[#E02C2C]"
                        : "text-white/25"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-white/80">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-sm text-[#E02C2C] font-medium">
                ({product.ratingCount} Rating)
              </span>
            </div>

            {/* Price row */}
            <div className="mt-5 flex flex-wrap items-end gap-4">
              <div>
                <p className="text-3xl font-medium">
                  {formatINR(product.price)}
                </p>
                <p className="mt-1 text-xs text-white/60">(Incl. all Taxes)</p>

                {product.oldPrice && (
                  <div className="mt-2 flex items-center gap-2 text-sm">
                    <span className="text-white/40 line-through">
                      MRP: {formatINR(product.oldPrice)}
                    </span>
                    {discountPercent !== null && (
                      <span className="text-white/80">
                        (Save {formatINR(product.oldPrice - product.price)},{" "}
                        {discountPercent}% off)
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* OR + EMI */}
              <div className="flex items-center gap-3">
                <span className="rounded-lg border border-[#2A2C33] bg-[#0B0B0D] px-3 py-1 text-xs font-bold text-white/80">
                  OR
                </span>

                <div>
                  <p className="text-xl font-extrabold">{product.emiText}</p>
                  <button className="text-sm font-semibold text-[#E02C2C] hover:text-white transition">
                    EMI Options
                  </button>
                </div>
              </div>
            </div>

            {/* Offers */}
            <div className="mt-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-medium">
                  Super Savings ({product.offers.length} OFFERS)
                </h3>
                <div className="flex items-center gap-2 text-white/60">
                  <BadgePercent className="h-4 w-4" />
                  <span className="text-xs font-semibold">Bank Offers</span>
                </div>
              </div>

              <div className="mt-4 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {product.offers.map((offer) => (
                  <div
                    key={offer.id}
                    className="min-w-[260px] rounded-2xl border border-[#2A2C33] bg-[#0B0B0D] p-4 hover:border-[#E02C2C] transition"
                  >
                    <p className="text-sm font-extrabold">{offer.title}</p>
                    <p className="mt-2 text-sm text-white/80 font-semibold">
                      {offer.subtitle}
                    </p>
                    <p className="mt-2 text-xs text-white/60 leading-relaxed line-clamp-3">
                      {offer.description}
                    </p>

                    <button className="mt-3 text-xs font-bold text-[#E02C2C] hover:text-white transition">
                      View more
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery */}
            <div className="mt-6 rounded-2xl border border-[#2A2C33] bg-[#0B0B0D] p-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Truck className="h-4 w-4 text-[#E02C2C]" />
                Delivery at:{" "}
                <span className="text-[#E02C2C]">Mumbai, 400049</span>
              </div>
              <p className="mt-2 text-xs text-white/60">
                Enter pincode to check availability & delivery estimates.
              </p>

              <div className="mt-3 flex gap-2">
                <input
                  placeholder="Enter pincode"
                  className="w-full rounded-xl border border-[#2A2C33] bg-[#121216] px-4 py-2.5 text-sm text-white outline-none focus:border-[#E02C2C] transition"
                />
                <button className="rounded-xl bg-[#E02C2C] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#B91C1C] transition">
                  Check
                </button>
              </div>
            </div>

            {/* Key Features */}
            <div className="mt-6 rounded-2xl border border-[#2A2C33] bg-[#0B0B0D] p-5">
              <h3 className="text-lg font-extrabold">Key Features</h3>
              <ul className="mt-4 space-y-3">
                {product.highlights.map((f, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-white/85">
                    <CheckCircle2 className="h-4 w-4 text-[#E02C2C] mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Actions */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button className="w-full rounded-xl bg-[#E02C2C] px-5 py-3 text-sm font-extrabold text-white hover:bg-[#B91C1C] transition">
                  Add to Cart
                </button>
                <button className="w-full rounded-xl border border-[#2A2C33] bg-[#121216] px-5 py-3 text-sm font-extrabold text-white hover:border-[#E02C2C] hover:bg-white/5 transition">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM: Overview + Specifications */}
        <div className="mt-8 rounded-2xl border border-[#2A2C33] bg-[#121216] overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-[#2A2C33] bg-[#0B0B0D] p-2">
            <button
              onClick={() => setTab("overview")}
              className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-extrabold transition ${
                tab === "overview"
                  ? "bg-[#E02C2C] text-white"
                  : "text-white/70 hover:bg-white/5"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setTab("specs")}
              className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-extrabold transition ${
                tab === "specs"
                  ? "bg-[#E02C2C] text-white"
                  : "text-white/70 hover:bg-white/5"
              }`}
            >
              Specifications
            </button>
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6">
            {tab === "overview" ? (
              <div className="space-y-4">
                <h3 className="text-lg font-extrabold">Product Overview</h3>
                <div className="space-y-3">
                  {product.overview.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-sm text-white/80 leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-extrabold">Specifications</h3>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {product.specifications.map((s, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-[#2A2C33] bg-[#0B0B0D] p-4"
                    >
                      <p className="text-xs text-white/60 font-semibold">
                        {s.label}
                      </p>
                      <p className="mt-1 text-sm font-extrabold text-white">
                        {s.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default DetailPage;
