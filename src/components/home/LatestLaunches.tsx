import React from "react";

type LaunchCard = {
  id: number;
  title: string;
  subtitle: string;
  priceText?: string;
  oldPriceText?: string;
  description?: string;
  cta: string;
  image: string;
  bgType: "light" | "dark";
};

const latestLaunches: LaunchCard[] = [
  {
    id: 1,
    title: "OnePlus 15R",
    subtitle: "Power On. Limits Off.",
    description: "Starting at ₹44,999*",
    cta: "Buy now",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1200&auto=format&fit=crop",
    bgType: "light",
  },
  {
    id: 2,
    title: "Truly Wireless Earbuds",
    subtitle: "Passive Noise Cancellation",
    oldPriceText: "₹1,000",
    priceText: "₹590",
    cta: "Buy now",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1200&auto=format&fit=crop",
    bgType: "dark",
  },
];

const LatestLaunches: React.FC = () => {
  return (
    <section className="w-full bg-[#0B0B0D] py-10">
      <div className="mx-auto max-w-7xl px-4">
        {/* Title */}
        <div className="flex items-center justify-between">
          <h2 className="text-white text-xl sm:text-2xl font-medium">
            Latest Launches
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {latestLaunches.map((item) => (
            <div
              key={item.id}
              className="
                relative overflow-hidden rounded-md
                border border-[#2A2C33]
                bg-[#121216]
                min-h-[230px]
                sm:min-h-[260px]
                lg:min-h-[280px]
                transition
                hover:border-[#E02C2C]
                hover:shadow-2xl hover:shadow-black/60
              "
            >
              {/* Background */}
              {item.bgType === "light" ? (
                <>
                  <div className="absolute inset-0 bg-linear-to-r from-white/80 via-white/60 to-white/30" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-linear-to-r from-[#0B0B0D] via-[#121216] to-[#1B1C22]" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                </>
              )}

              {/* Accent Glow */}
              <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-[#E02C2C]/15 blur-3xl" />

              {/* Content */}
              <div className="relative z-10 flex h-full w-full items-center justify-between gap-4 p-6 sm:p-8">
                {/* Text */}
                <div className="max-w-[60%]">
                  <p
                    className={`text-xs font-semibold tracking-wide ${
                      item.bgType === "light"
                        ? "text-black/60"
                        : "text-white/60"
                    }`}
                  >
                    INDO MART
                  </p>

                  <h3
                    className={`mt-2 text-2xl sm:text-3xl font-extrabold leading-tight ${
                      item.bgType === "light" ? "text-black" : "text-white"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`mt-1 text-sm sm:text-base font-semibold ${
                      item.bgType === "light"
                        ? "text-black/70"
                        : "text-white/75"
                    }`}
                  >
                    {item.subtitle}
                  </p>

                  {/* price block */}
                  {(item.priceText || item.description) && (
                    <div className="mt-3 flex items-center gap-2">
                      {item.oldPriceText && (
                        <span
                          className={`text-sm line-through ${
                            item.bgType === "light"
                              ? "text-black/50"
                              : "text-white/40"
                          }`}
                        >
                          {item.oldPriceText}
                        </span>
                      )}
                      {item.priceText && (
                        <span
                          className={`text-lg font-extrabold ${
                            item.bgType === "light"
                              ? "text-black"
                              : "text-white"
                          }`}
                        >
                          {item.priceText}
                        </span>
                      )}
                      {item.description && (
                        <span
                          className={`text-sm font-semibold ${
                            item.bgType === "light"
                              ? "text-black/70"
                              : "text-white/70"
                          }`}
                        >
                          {item.description}
                        </span>
                      )}
                    </div>
                  )}

                  {/* CTA */}
                  <button
                    className="
                      mt-5 inline-flex items-center justify-center
                      rounded-xl bg-[#E02C2C]
                      px-5 py-2.5 text-sm font-bold text-white
                      hover:bg-[#B91C1C] transition
                    "
                  >
                    {item.cta}
                  </button>

                  {/* Note text (optional like screenshot small note) */}
                  {item.id === 1 && (
                    <p
                      className={`mt-2 text-[11px] ${
                        item.bgType === "light"
                          ? "text-black/50"
                          : "text-white/40"
                      }`}
                    >
                      *including bank discount
                    </p>
                  )}
                </div>

                {/* Image */}
                <div className="relative w-[40%] h-full flex items-center justify-end">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="
                      h-[170px] sm:h-[190px] lg:h-[210px]
                      w-auto object-contain
                      drop-shadow-2xl
                      transition duration-500
                      hover:scale-[1.03]
                    "
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestLaunches;
