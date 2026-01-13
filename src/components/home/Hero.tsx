import React, { useEffect, useMemo, useState } from "react";

type Slide = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
};

const Hero: React.FC = () => {
  const slides: Slide[] = useMemo(
    () => [
      {
        id: "s1",
        title: "Premium Electrical Solutions",
        subtitle:
          "Trusted since 1965 — Powering homes and businesses with quality products.",
        image:
          "https://images.unsplash.com/photo-1586864387789-628af9feed72?q=80&w=1920&auto=format&fit=crop",
        ctaText: "Shop Now",
        ctaLink: "#",
      },
      {
        id: "s2",
        title: "Smart Lighting & Home Comfort",
        subtitle:
          "Upgrade your space with modern lighting and appliances built for performance.",
        image:
          "https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?q=80&w=1920&auto=format&fit=crop",
        ctaText: "Explore Lighting",
        ctaLink: "#",
      },
      {
        id: "s3",
        title: "Top Brands. Best Value.",
        subtitle:
          "Switches, cables, appliances, and everything electrical — in one trusted store.",
        image:
          "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1920&auto=format&fit=crop",
        ctaText: "View Categories",
        ctaLink: "#",
      },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [slides.length]);

//   const goNext = () => setActiveIndex((prev) => (prev + 1) % slides.length);
//   const goPrev = () =>
//     setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full h-[calc(100vh-64px)] overflow-hidden">
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
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
                draggable={false}
              />

              {/* Dark overlay (matches INDO theme) */}
              <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/30" />

              {/* Red glow accent */}
              <div className="absolute inset-0">
                <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-[#E02C2C]/20 blur-3xl" />
                <div className="absolute bottom-[-180px] right-[-180px] h-[480px] w-[480px] rounded-full bg-white/5 blur-3xl" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl px-4">
        <div className="flex w-full items-center">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white">
              INDO Electric Mart <span className="text-[#E02C2C]">•</span>{" "}
              Trusted since 1965
            </p>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {slides[activeIndex].title}
            </h1>

            <p className="mt-4 text-base text-white/80 sm:text-lg leading-relaxed">
              {slides[activeIndex].subtitle}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={slides[activeIndex].ctaLink}
                className="inline-flex w-fit items-center justify-center rounded-xl bg-[#E02C2C] px-6 py-3 text-sm font-bold text-white hover:bg-[#B91C1C] transition"
              >
                {slides[activeIndex].ctaText}
              </a>

              <a
                href="#"
                className="inline-flex w-fit items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition"
              >
                Learn More
              </a>
            </div>

            {/* Indicators */}
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
          </div>
        </div>
      </div>

      {/* Controls */}
      {/* <div className="absolute inset-x-0 bottom-8 z-20 mx-auto flex max-w-7xl justify-between px-4">
        <button
          onClick={goPrev}
          className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm font-bold text-white hover:bg-black/60 transition"
        >
          Prev
        </button>

        <button
          onClick={goNext}
          className="rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm font-bold text-white hover:bg-black/60 transition"
        >
          Next
        </button>
      </div> */}
    </section>
  );
};

export default Hero;
