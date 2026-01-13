import React from "react";

type FooterLink = {
  label: string;
  href: string;
};

const Footer: React.FC = () => {
  const quickLinks: FooterLink[] = [
    { label: "About INDO", href: "#" },
    { label: "Store Locator", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "Careers", href: "#" },
  ];

  const customerService: FooterLink[] = [
    { label: "Shipping & Delivery", href: "#" },
    { label: "Returns & Refunds", href: "#" },
    { label: "Warranty Policy", href: "#" },
    { label: "FAQs", href: "#" },
  ];

  const categories: FooterLink[] = [
    { label: "Home Appliances", href: "#" },
    { label: "Lighting Products", href: "#" },
    { label: "Electrical Equipments", href: "#" },
    { label: "Kitchen Appliances", href: "#" },
  ];

  const legal: FooterLink[] = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Disclaimer", href: "#" },
  ];

  return (
    <footer className="bg-[#0B0B0D] border-t border-[#2A2C33]">
      {/* TOP GRID */}
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3">
              <img src="/INDO_logo.png" className="w-24" alt="" />
            </div>

            <p className="mt-4 text-sm text-[#9AA3AF] leading-6">
              Premium electrical and home appliance solutions built on trust,
              quality, and expert service — powering homes and businesses since
              1965.
            </p>

            <div className="mt-5 space-y-2 text-sm">
              <p className="text-white font-semibold">Customer Support</p>
              <p className="text-[#9AA3AF]">
                Phone: <span className="text-white">+91 98765 43210</span>
              </p>
              <p className="text-[#9AA3AF]">
                Email:{" "}
                <span className="text-white">support@indoelectricmart.com</span>
              </p>
            </div>
          </div>

          {/* LINKS */}
          <FooterColumn title="Quick Links" links={quickLinks} />
          <FooterColumn title="Customer Service" links={customerService} />
          <FooterColumn title="Categories" links={categories} />
        </div>

        {/* NEWSLETTER */}
        <div className="mt-10 rounded-2xl border border-[#2A2C33] bg-[#121216] p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-white font-extrabold text-lg">
                Stay Updated with INDO Deals
              </p>
              <p className="text-sm text-[#9AA3AF] mt-1">
                Get new arrivals, special offers, and product updates delivered
                to your inbox.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row md:max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-xl bg-[#0B0B0D] border border-[#2A2C33] px-4 py-3 text-sm text-white placeholder:text-[#9AA3AF] outline-none focus:border-[#E02C2C] transition"
              />
              <button className="rounded-xl bg-[#E02C2C] px-5 py-3 text-sm font-bold text-white hover:bg-[#B91C1C] transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* LEGAL LINKS */}
        <div className="mt-10 flex flex-col gap-4 border-t border-[#2A2C33] pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-[#9AA3AF]">
            © {new Date().getFullYear()} INDO Electric Mart. All Rights
            Reserved.
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {legal.map((x) => (
              <a
                key={x.label}
                href={x.href}
                className="text-xs font-semibold text-[#9AA3AF] hover:text-white transition"
              >
                {x.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const FooterColumn = ({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) => {
  return (
    <div>
      <p className="text-white font-extrabold text-base">{title}</p>
      <div className="mt-4 space-y-3">
        {links.map((x) => (
          <a
            key={x.label}
            href={x.href}
            className="block text-sm font-medium text-[#9AA3AF] hover:text-white transition"
          >
            {x.label}
          </a>
        ))}
      </div>
    </div>
  );
};
