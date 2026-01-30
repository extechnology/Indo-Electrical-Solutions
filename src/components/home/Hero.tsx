import React, { useEffect, useMemo, useState } from "react";
import { useBanners } from "../../hooks/useBanners";
import type { HomeBanner } from "../../types";

type Slide = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
};

const Hero: React.FC = () => {
  const { data: banners } = useBanners();
  const [activeIndex, setActiveIndex] = useState(0);
  console.log(banners,"banners");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");

    const handleChange = () => setIsMobile(media.matches);

    handleChange(); // initial check
    media.addEventListener("change", handleChange);

    return () => media.removeEventListener("change", handleChange);
  }, []);

  // ✅ Build slides from API banners
  const slides: Slide[] = useMemo(() => {
    const type = isMobile ? "HERO_MOBILE" : "HERO";

    const heroBanners = (banners || [])
      .filter((b: HomeBanner) => b.banner_type === type && b.is_active)
      .sort(
        (a: HomeBanner, b: HomeBanner) =>
          (a.sort_order ?? 0) - (b.sort_order ?? 0),
      );

    if (heroBanners.length === 0) {
      return [
        {
          id: "fallback-1",
          title: "INDO Electric Mart",
          subtitle: "Premium Electrical & Sanitary Products",
          image: "/banner1.jpg",
          ctaText: "Explore Products",
          ctaLink: "/products",
        },
      ];
    }

    return heroBanners.map((b: HomeBanner) => ({
      id: String(b.id),
      title: b.title ?? "",
      subtitle: b.description ?? "",
      image: b.image || "/banner1.jpg",
      ctaText: "Explore Products",
      ctaLink: "/products",
    }));
  }, [banners, isMobile]);

  // ✅ Reset activeIndex when slides change (important)
  useEffect(() => {
    setActiveIndex(0);
  }, [slides.length]);

  // ✅ Auto-slide (only if more than 1 slide)
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative h-[calc(100vh-64px)] w-full overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* ✅ Background Image from API */}
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
                draggable={false}
                loading={index === 0 ? "eager" : "lazy"}
              />
              {slide.title?.trim() && (
                <div className="absolute inset-0 flex items-center justify-center px-4">
                  <div className="rounded-xl bg-black/40 px-6 py-4 backdrop-blur-sm">
                    <h2 className="text-center text-2xl font-semibold text-white sm:text-4xl">
                      {slide.title}
                    </h2>

                    {slide.subtitle?.trim() && (
                      <p className="mt-2 text-center text-sm text-white/80 sm:text-base">
                        {slide.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Dark overlay */}
              {/* <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/30" /> */}

              {/* Red glow accent */}
              <div className="absolute inset-0">
                <div className="absolute -top-40 -left-40 h-full w-full rounded-full bg-[#E02C2C]/20 blur-3xl" />
                {/* <div className="absolute bottom-[-180px] right-[-180px] h-[480px] w-[480px] rounded-full bg-white/5 blur-3xl" /> */}
              </div>
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl px-4">
        <div className="flex w-full items-center">
          {/* <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white">
              INDO Electric Mart <span className="text-[#E02C2C]">•</span>{" "}
              Trusted since 1965
            </p>

            <h1 className="mt-5 text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
              {slides[activeIndex]?.title}
            </h1>

            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
              {slides[activeIndex]?.subtitle}
            </p>

            <div className="mt-10 flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? "w-10 bg-[#E02C2C]"
                      : "w-2.5 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
