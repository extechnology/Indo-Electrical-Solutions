import React, { useMemo, useState, useEffect } from "react";
import {
  BadgePercent,
  Sparkles,
  CreditCard,
  Gift,
  Clock,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { HomeBanner } from "../types";
import { useBanners } from "../hooks/useBanners";
import { useOffers } from "../hooks/useOffers";

type OfferType =
  | "All"
  | "Bank Offers"
  | "Cashback"
  | "No Cost EMI"
  | "Combo Deals"
  | "Exchange"
  | "Festival";

type Offer = {
  id: string;
  title?: string;
  description: string;
  image: string;
  valid_upto: string;
  is_active?: boolean;
  created_at?: string;
};

const OffersSchemesPage: React.FC = () => {
  const [activeType, setActiveType] = useState<OfferType>("All");
  const { data: offers = [] } = useOffers();
  const { data: banners = [] } = useBanners();

  const [isMobile, setIsMobile] = useState(false);

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

  const OffersBanner: HomeBanner | undefined = useMemo(() => {
    const type = isMobile ? "OFFERS_MOBILE" : "OFFERS";

    return banners?.find(
      (b: HomeBanner) => b.banner_type === type && b.is_active,
    );
  }, [banners, isMobile]);

  const offerTypes: { label: OfferType; icon: React.ReactNode }[] = [
    { label: "All", icon: <Sparkles className="w-4 h-4" /> },
    { label: "Bank Offers", icon: <CreditCard className="w-4 h-4" /> },
    { label: "Cashback", icon: <BadgePercent className="w-4 h-4" /> },
    { label: "No Cost EMI", icon: <Zap className="w-4 h-4" /> },
    { label: "Combo Deals", icon: <Gift className="w-4 h-4" /> },
    { label: "Exchange", icon: <BadgePercent className="w-4 h-4" /> },
    { label: "Festival", icon: <Clock className="w-4 h-4" /> },
  ];

  const filteredOffers = useMemo(() => {
    if (activeType === "All") return offers;
    return offers.filter((o: Offer) => o.is_active);
  }, [offers, activeType]);

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white">
      {/* ✅ HERO */}
      <section className="relative border-b border-white/10">
        {/* ✅ Background Image Layer */}
        <img
          src={OffersBanner?.image || "/banner1.jpg"}
          alt={OffersBanner?.title || "Offers Banner"}
          loading="lazy"
          className="absolute inset-0  w-full object-cover"
        />

        {/* ✅ Overlay Layer (dark + gradient + glow shapes) */}
        {/* <div className="absolute inset-0 bg-black/55" /> */}

        <div className="absolute inset-0">
          <div className="absolute -top-28 -left-28 h-96 w-96 rounded-full bg-red-500/20 blur-3xl" />
          {/* <div className="absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-white/10 blur-3xl" /> */}
          <div className="absolute inset-0 bg-linear-to-b from-white/10 to-transparent" />
        </div>

        {/* ✅ Content Layer */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 md:py-14">
          <div className="flex flex-col gap-3">
            {/* <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-extrabold text-white/80 backdrop-blur">
              <BadgePercent className="h-4 w-4 text-[#E02C2C]" />
              Offers & Schemes • Premium Savings
            </p> */}

            {/* Optional dynamic title/description */}
            {/* <h1 className="text-2xl md:text-4xl font-semibold tracking-tight text-white">
        {OffersBanner?.title || "Unlock Better Deals, Every Day."}
      </h1>

      <p className="max-w-2xl text-sm md:text-base text-white/70">
        {OffersBanner?.description ||
          "Explore bank offers, cashback, no-cost EMI, combo deals and seasonal schemes — all in one premium experience."}
      </p> */}

            {/* <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E02C2C] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#B91C1C]"
              >
                Explore Products <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/brochure"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Download Brochures
              </Link>
            </div> */}
          </div>
        </div>
      </section>

      {/* ✅ OFFER TYPE SELECTOR (Innovative Chips) */}
      <section className="mx-auto max-w-7xl px-4 pt-28">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg md:text-xl font-medium">Browse Offers</h2>
            <p className="mt-1 text-sm text-white/60">
              Tap a category to filter offers instantly.
            </p>
          </div>

          <div className="hidden md:flex text-xs text-white/60 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            Total Offers:{" "}
            <span className="ml-2 text-white">{filteredOffers.length}</span>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {offerTypes.map((t) => {
            const active = activeType === t.label;
            return (
              <button
                key={t.label}
                onClick={() => setActiveType(t.label)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition
                  ${
                    active
                      ? "border-[#E02C2C] bg-[#E02C2C]/15 text-white"
                      : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
              >
                <span className={active ? "text-[#E02C2C]" : "text-white/60"}>
                  {t.icon}
                </span>
                {t.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ✅ HOT DEAL STRIP */}
      <section className="mx-auto max-w-7xl px-4 pt-10">
        <div className="rounded-3xl border border-white/10 bg-linear-to-r from-white/5 to-transparent p-6 md:p-8 overflow-hidden relative">
          <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-red-500/15 blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-xs font-medium text-white/60">
                HOT DEALS • LIMITED TIME
              </p>
              <h3 className="mt-2 text-xl md:text-2xl font-medium">
                Best Offers You Shouldn’t Miss
              </h3>
              <p className="mt-2 text-sm text-white/60 max-w-xl">
                Deals refresh frequently. Grab them before they expire.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/exclusive"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black px-6 py-3 text-sm font-medium hover:bg-white/90 transition"
              >
                View Exclusives <Sparkles className="w-4 h-4" />
              </Link>
              {/* <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/30 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link> */}
            </div>
          </div>
        </div>
      </section>

      {/* ✅ OFFERS GRID (Coupon Style Cards) */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOffers.map((o: Offer) => (
            <div
              key={o.id}
              className="group relative overflow-hidden rounded-3xl
        border border-white/10 bg-white/4
        backdrop-blur-xl
        transition-all duration-300
        hover:border-white/20 hover:bg-white/8"
            >
              {/* Glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />
              </div>

              {/* ✅ Full-width image */}
              <div className="relative w-full aspect-video overflow-hidden">
                <img
                  src={o?.image}
                  alt={o?.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* ✅ Content with padding */}
              <div className="relative p-6 flex flex-col h-full text-center">
                <h3 className="text-lg font-medium leading-snug">{o?.title}</h3>

                <p className="mt-2 text-sm text-white/60 line-clamp-3">
                  {o?.description}
                </p>

                {o.valid_upto && (
                  <div className="mt-6 flex items-center justify-center gap-2 text-xs text-white/50">
                    <Clock className="w-4 h-4" />
                    <span>Valid till {o.valid_upto}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Final CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
          <p className="text-xs font-extrabold text-white/60">
            PREMIUM SAVINGS MODE
          </p>
          <h3 className="mt-2 text-xl md:text-2xl font-extrabold">
            Want the best deals automatically?
          </h3>
          <p className="mt-2 text-sm text-white/60 max-w-2xl">
            Explore exclusive picks and limited-time offers. This section will
            be updated regularly with fresh deals.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              to="/exclusive"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black px-6 py-3 text-sm font-extrabold hover:bg-white/90 transition"
            >
              Explore Exclusives <Sparkles className="w-4 h-4" />
            </Link>
            {/* <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/30 px-6 py-3 text-sm font-extrabold text-white hover:bg-white/10 transition"
            >
              Browse Products <ArrowRight className="w-4 h-4" />
            </Link> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OffersSchemesPage;
