import { useBrands } from "../../hooks/useBrands";


const BrandCarousel = () => {
  const { data: brands = [] } = useBrands();
  const items = [...brands, ...brands];
  return (
    <section className="bg-linear-to-br from-[#0B0B0D] via-[#0B0B0D] to-[#0B0B0D] max-w-7xl  mx-auto relative overflow-hidden py-14">
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r " />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l " />

      <div className="relative ">
        <div className="flex w-max animate-brand-scroll gap-14 px-10">
          {items.map((brand: any, i: number) => (
            <div
              key={`${brand.id}-${i}`}
              className="flex items-center justify-center
                         grayscale opacity-60
                         transition-all duration-300
                         hover:grayscale-0 hover:opacity-100"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-10 md:h-12 lg:h-25 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;
