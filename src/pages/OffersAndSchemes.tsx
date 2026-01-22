import React, { useMemo, useState } from "react";
import {
  BadgePercent,
  Sparkles,
  CreditCard,
  Gift,
  Clock,
  Zap,
  Copy,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

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
  title: string;
  subtitle: string;
  type: OfferType;
  badge?: string;
  code?: string;
  validTill?: string;
  minCartValue?: string;
  highlight?: string[];
  ctaLabel?: string;
};

const OffersSchemesPage: React.FC = () => {
  const [activeType, setActiveType] = useState<OfferType>("All");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const offerTypes: { label: OfferType; icon: React.ReactNode }[] = [
    { label: "All", icon: <Sparkles className="w-4 h-4" /> },
    { label: "Bank Offers", icon: <CreditCard className="w-4 h-4" /> },
    { label: "Cashback", icon: <BadgePercent className="w-4 h-4" /> },
    { label: "No Cost EMI", icon: <Zap className="w-4 h-4" /> },
    { label: "Combo Deals", icon: <Gift className="w-4 h-4" /> },
    { label: "Exchange", icon: <BadgePercent className="w-4 h-4" /> },
    { label: "Festival", icon: <Clock className="w-4 h-4" /> },
  ];

  const offers: Offer[] = useMemo(
    () => [
      {
        id: "o1",
        title: "Flat ₹1,500 Off on Premium Electronics",
        subtitle: "Limited-time deal on select categories.",
        type: "Festival",
        badge: "Trending",
        code: "FEST1500",
        validTill: "Valid till: 31 Jan",
        minCartValue: "Min cart: ₹15,000",
        highlight: ["Best sellers", "Limited stock", "Fast delivery"],
        ctaLabel: "Shop Now",
      },
      {
        id: "o2",
        title: "HDFC Bank Offer – 10% Instant Discount",
        subtitle: "Credit/Debit cards on eligible products.",
        type: "Bank Offers",
        badge: "Bank Offer",
        code: "HDFC10",
        validTill: "Valid till: 28 Jan",
        minCartValue: "Min cart: ₹7,999",
        highlight: ["Instant discount", "Secure payments", "Limited period"],
        ctaLabel: "Explore Products",
      },
      {
        id: "o3",
        title: "No Cost EMI Available",
        subtitle: "Buy now, pay later with 0% EMI.",
        type: "No Cost EMI",
        badge: "Easy EMI",
        validTill: "Valid till: Ongoing",
        highlight: ["0% EMI", "Quick approval", "Premium products"],
        ctaLabel: "View EMI Products",
      },
      {
        id: "o4",
        title: "Combo Deal: Save More on Accessories",
        subtitle: "Add accessories and unlock extra savings.",
        type: "Combo Deals",
        badge: "Combo",
        code: "COMBO5",
        validTill: "Valid till: 31 Jan",
        minCartValue: "Min cart: ₹2,999",
        highlight: ["Bundle savings", "More value", "Exclusive pricing"],
        ctaLabel: "Build Combo",
      },
      {
        id: "o5",
        title: "Cashback Upto ₹1,000",
        subtitle: "Wallet cashback on select purchases.",
        type: "Cashback",
        badge: "Cashback",
        code: "CASH1000",
        validTill: "Valid till: 30 Jan",
        minCartValue: "Min cart: ₹9,999",
        highlight: ["Wallet cashback", "Fast checkout", "Limited deal"],
        ctaLabel: "Claim Cashback",
      },
      {
        id: "o6",
        title: "Exchange Bonus upto ₹2,000",
        subtitle: "Exchange old products and save more.",
        type: "Exchange",
        badge: "Exchange",
        validTill: "Valid till: Ongoing",
        highlight: ["Extra savings", "Eco-friendly", "Easy upgrade"],
        ctaLabel: "Exchange Now",
      },
    ],
    [],
  );

  const filteredOffers = useMemo(() => {
    if (activeType === "All") return offers;
    return offers.filter((o) => o.type === activeType);
  }, [offers, activeType]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(text);
      setTimeout(() => setCopiedCode(null), 1200);
    } catch (err) {
      console.log("Clipboard error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-white">
      {/* ✅ HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <div className="absolute -top-28 -left-28 h-96 w-96 rounded-full bg-red-500/20 blur-3xl" />
          <div className="absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent" />
        </div>

        <div className="absolute inset-0 bg-[url('/banner1.jpg')] bg-cover bg-center bg-no-repeat"></div>

        <div className="relative mx-auto max-w-7xl px-4 py-10 md:py-14">
          <div className="flex flex-col gap-3">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-extrabold text-white/80">
              <BadgePercent className="w-4 h-4 text-[#E02C2C]" />
              Offers & Schemes • Premium Savings
            </p>

            <h1 className="text-2xl md:text-4xl font-medium tracking-tight">
              Unlock Better Deals, Every Day.
            </h1>

            <p className="max-w-2xl text-sm md:text-base text-white/70">
              Explore bank offers, cashback, no-cost EMI, combo deals and
              seasonal schemes — all in one premium experience.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#E02C2C] px-5 py-3 text-sm font-bold text-white hover:bg-[#B91C1C] transition"
              >
                Explore Products <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/brochure"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white hover:bg-white/10 transition"
              >
                Download Brochures
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ OFFER TYPE SELECTOR (Innovative Chips) */}
      <section className="mx-auto max-w-7xl px-4 pt-10">
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
                Today’s Best Offers You Shouldn’t Miss
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
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/30 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition"
              >
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ OFFERS GRID (Coupon Style Cards) */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOffers.map((o) => (
            <div
              key={o.id}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              {/* Premium side cut style */}
              <div className="absolute -left-10 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full bg-[#0B0B0D] border border-white/10" />
              <div className="absolute -right-10 top-1/2 h-16 w-16 -translate-y-1/2 rounded-full bg-[#0B0B0D] border border-white/10" />

              {/* glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                <div className="absolute -top-16 -right-16 h-72 w-72 rounded-full bg-red-500/15 blur-3xl" />
              </div>

              <div className="relative p-6">
                {/* header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs text-white/60 font-medium">
                      {o.type.toUpperCase()}
                    </p>
                    <h3 className="mt-2 text-lg font-medium leading-snug">
                      {o.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/60">{o.subtitle}</p>
                  </div>

                  {o.badge && (
                    <span className="rounded-full bg-[#E02C2C] px-4 py-2 text-xs font-medium text-white">
                      {o.badge}
                    </span>
                  )}
                </div>

                {/* details */}
                <div className="mt-5 space-y-2 text-xs text-white/60">
                  {o.validTill && (
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-white/60" />
                      {o.validTill}
                    </p>
                  )}
                  {o.minCartValue && (
                    <p className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-white/60" />
                      {o.minCartValue}
                    </p>
                  )}
                </div>

                {/* highlights */}
                {o.highlight && o.highlight.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {o.highlight.map((h) => (
                      <span
                        key={h}
                        className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[11px] font-bold text-white/80"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}

                {/* coupon */}
                <div className="mt-6 flex items-center justify-between gap-3">
                  {o.code ? (
                    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-4 py-3 w-full">
                      <span className="text-xs text-white/60 font-bold">
                        CODE:
                      </span>
                      <span className="text-sm font-extrabold text-white">
                        {o.code}
                      </span>

                      <div className="ml-auto">
                        <button
                          onClick={() => copyToClipboard(o.code!)}
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-white text-black px-3 py-2 text-xs font-extrabold hover:bg-white/90 transition"
                        >
                          {copiedCode === o.code ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-xs font-bold text-white/70">
                      No coupon required
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="mt-6">
                  <Link
                    to="/products"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#E02C2C] px-5 py-3 text-sm font-extrabold text-white hover:bg-[#B91C1C] transition"
                  >
                    {o.ctaLabel || "Explore"} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
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
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-black/30 px-6 py-3 text-sm font-extrabold text-white hover:bg-white/10 transition"
            >
              Browse Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OffersSchemesPage;
