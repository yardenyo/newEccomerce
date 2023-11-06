import HeroSection from "@/components/HeroSection";
import ProductContent from "@/components/ProductContent";
import Categories from "@/components/Categories";
import Promotion from "@/components/Promotion";

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
    <main className="flex flex-col space-y-8">
      <HeroSection />
      <ProductContent {...newArrivals} />
      <Categories />
      <ProductContent {...bestSellers} />
      <Promotion />
    </main>
  );
};

export default Home;
