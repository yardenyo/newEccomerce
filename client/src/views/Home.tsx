import HeroSection from "@/components/Layout/HeroSection";
import ProductContent from "@/components/Products/ProductContent";
import Categories from "@/components/Categories/Categories";
import Promotion from "@/components/Layout/Promotion";
import Features from "@/components/Features/Features";

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
    <main className="flex flex-col space-y-8 mb-8">
      <HeroSection />
      <ProductContent {...newArrivals} />
      <Categories />
      <ProductContent {...bestSellers} />
      <Promotion />
      <Features />
    </main>
  );
};

export default Home;
