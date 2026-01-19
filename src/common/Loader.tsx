import React from "react";

type Props = {
  label?: string;
};

const Loader: React.FC<Props> = ({ label = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-9999 bg-[#0B0B0D] flex items-center justify-center">
      {/* Soft background glows */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-[#E02C2C]/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-[-200px] right-[-200px] h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl animate-pulse" />
      </div>

      <div className="relative flex flex-col items-center gap-4">
        {/* Loader Ring */}
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 rounded-full border-4 border-[#2A2C33]" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#E02C2C] animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 rounded-2xl bg-[#121216] border border-[#2A2C33] flex items-center justify-center">
              <span className="text-white font-extrabold tracking-wide"><img src="/indo_logo2.png" alt="" /></span>
            </div>
          </div>
        </div>

        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="text-xs text-[#9AA3AF]">INDO Electric Mart • Trusted since 1965</p>
      </div>
    </div>
  );
};

export default Loader;
