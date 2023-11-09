import HeroSection from "@/components/Layout/HeroSection";
import ProductContent from "@/components/Products/ProductContent";
import Categories from "@/components/Categories/Categories";
import Promotion from "@/components/Layout/Promotion";
import Features from "@/components/Features/Features";
import { useGetAllProductsQuery } from "@/features/products/productsApiSlice";
import Loading from "@/components/Layout/Loading";

const Home = () => {
  const newArrivalsPayload = {
    sortBy: "createdAt",
    sortOrder: 0,
    resultsPerPage: 5,
  };

  const {
    data: newArrivalsResponse,
    isLoading: newArrivalsLoading,
    isFetching: newArrivalsFetching,
  } = useGetAllProductsQuery(newArrivalsPayload);

  const bestSellersPayload = {
    sortBy: "sold",
    sortOrder: 0,
    resultsPerPage: 10,
  };

  const {
    data: bestSellersResponse,
    isLoading: bestSellersLoading,
    isFetching: bestSellersFetching,
  } = useGetAllProductsQuery(bestSellersPayload);

  const loading =
    newArrivalsLoading ||
    bestSellersLoading ||
    bestSellersFetching ||
    newArrivalsFetching;

  const newArrivalsProducts = newArrivalsResponse?.data || [];

  const bestSellersProducts = bestSellersResponse?.data || [];

  const newArrivals = {
    title: "New Arrivals",
    tag: "New",
    products: newArrivalsProducts,
  };

  const bestSellers = {
    title: "Best Sellers",
    tag: "Hot",
    products: bestSellersProducts,
  };

  return (
    <main className="flex flex-col space-y-8 mb-8">
      <HeroSection />
      {loading ? <Loading /> : <ProductContent {...newArrivals} />}
      <Categories />
      {loading ? <Loading /> : <ProductContent {...bestSellers} />}
      <Promotion />
      <Features />
    </main>
  );
};

export default Home;
