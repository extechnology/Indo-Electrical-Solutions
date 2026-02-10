import React from "react";
import { X } from "lucide-react";

type Props = {
  title: string;
  items: string[];
  onClose: () => void;
};

const DescriptionModal: React.FC<Props> = ({ title, items, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-xl rounded-2xl bg-[#121216] border border-white/10 p-6 text-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <ul className="mt-4 space-y-3 text-sm text-white/80">
          {items.map((point, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#E02C2C]" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DescriptionModal;
