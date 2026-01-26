import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useLatestLaunch } from "../../hooks/useLatestLaunch";

type LatestLaunchAPI = {
  id: number;
  image: string;
  title: string;
  description?: string;
  is_active: boolean;
};

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

const LatestLaunches: React.FC = () => {
  const { data: latestLaunches } = useLatestLaunch();

  // ✅ Convert API -> UI cards
  const cards: LaunchCard[] = useMemo(() => {
    const activeLaunches = (latestLaunches ?? []).filter(
      (x: LatestLaunchAPI) => x.is_active,
    );

    return activeLaunches.map((item: LatestLaunchAPI, index: number) => ({
      id: item.id,
      title: item.title,
      subtitle: "New Arrival", // ✅ you can customize
      description: item.description || "",
      cta: "Shop now",
      image: item.image || "/banner1.jpg",
      bgType: index % 2 === 0 ? "light" : "dark", // ✅ alternating style
    }));
  }, [latestLaunches]);

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
          {cards.map((item) => (
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

                  {/* Description */}
                  {item.description && (
                    <p
                      className={`mt-3 text-sm font-semibold ${
                        item.bgType === "light"
                          ? "text-black/70"
                          : "text-white/70"
                      }`}
                    >
                      {item.description}
                    </p>
                  )}

                  {/* CTA */}
                  <Link
                    to="/exclusive"
                    className="
                      mt-5 inline-flex items-center justify-center
                      rounded-xl bg-[#E02C2C]
                      px-5 py-2.5 text-sm font-bold text-white
                      hover:bg-[#B91C1C] transition
                    "
                  >
                    {item.cta}
                  </Link>
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
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* ✅ Empty state */}
          {cards.length === 0 && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">
              No latest launches available right now.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestLaunches;
