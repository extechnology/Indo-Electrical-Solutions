import React from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-[70vh] w-full bg-[#070709] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Premium Glow */}
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-red-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative">
          <p className="text-xs tracking-widest text-white/60">ERROR</p>

          <h1 className="mt-2 text-4xl md:text-6xl font-extrabold leading-tight">
            404
          </h1>

          <p className="mt-2 text-lg md:text-xl font-bold text-white/90">
            Page not found
          </p>

          <p className="mt-3 text-sm md:text-base text-white/60">
            The page you’re trying to access doesn’t exist or may have been
            moved.
          </p>

          <div className="mt-4 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-xs text-white/70">
            <span className="text-white/50">Requested URL: </span>
            <span className="font-semibold text-white">
              {location.pathname}
            </span>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl bg-[#E02C2C] px-5 py-3 text-sm font-bold text-white hover:bg-[#B91C1C] transition"
            >
              Go Home
            </Link>

            <Link
              to="/brochure"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white hover:bg-white/10 transition"
            >
              Browse Brochures
            </Link>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-white hover:bg-white/10 transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
