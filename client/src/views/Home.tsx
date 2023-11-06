import HeroSection from "@/components/HeroSection";
import ProductContent from "@/components/ProductContent";
// import Brands from "@/components/Brands";

const Home = () => {
  const newArrivals = {
    title: "New Arrivals",
    payload: {
      sortBy: "createdAt",
      sortOrder: 0,
      resultsPerPage: 5,
    },
    tag: "New",
  };

  const bestSellers = {
    title: "Best Sellers",
    payload: {
      sortBy: "sold",
      sortOrder: 0,
      resultsPerPage: 10,
    },
    tag: "Hot",
  };

  return (
    <main>
      <HeroSection />
      <ProductContent {...newArrivals} />
      {/* <Brands /> */}
      <ProductContent {...bestSellers} />
    </main>
  );
};

export default Home;
