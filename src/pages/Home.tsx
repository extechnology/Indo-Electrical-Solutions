import Hero from "../components/home/Hero";
import CategoryDisplay from "../components/home/CategoryDisplay";
import FeaturedProducts from "../components/home/FeaturedProducts";
import LatestLaunches from "../components/home/LatestLaunches";

const Home = () => {
  return (
    <div>
      <Hero />
      <CategoryDisplay />
      <FeaturedProducts />
      <LatestLaunches />
    </div>
  );
};

export default Home;
