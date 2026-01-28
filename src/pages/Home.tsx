import Hero from "../components/home/Hero";
import CategoryDisplay from "../components/home/CategoryDisplay";
import FeaturedProducts from "../components/home/FeaturedProducts";
import LatestLaunches from "../components/home/LatestLaunches";
import BrandCarousel from "../components/home/BrandCarousel";

const Home = () => {
  return (
    <div>
      <Hero />
      <CategoryDisplay />
      <FeaturedProducts />
      <div className="bg-linear-to-br from-[#0B0B0D] via-[#0B0B0D] to-[#0B0B0D]">
        <BrandCarousel />
      </div>
      <LatestLaunches />
    </div>
  );
};

export default Home;
