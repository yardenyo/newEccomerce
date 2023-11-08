import Navbar from "@/components/Layout/Navbar";
import ShopFilters from "@/components/ShopFilters/ShopFilters";
import ShopProducts from "@/components/ShopProducts/ShopProducts";

const Shop = () => {
  const shopHeroSectionImage =
    "https://res.cloudinary.com/dweltcoxk/image/upload/v1699447608/assets/vqtp2l6m0dfzqa9jxhxo.jpg";

  return (
    <section className="flex flex-col mb-8 container mx-auto px-4">
      <Navbar />
      <div className="flex justify-center relative w-full mb-8">
        <img
          src={shopHeroSectionImage}
          alt="Shop Hero Section"
          className="w-full h-96 object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col text-center w-full">
          <div className="title text-2xl font-semibold">Shopping Page</div>
          <div className="subtitle">
            Elevate Your Digital Lifestyle - Dive into the World of Cutting-Edge
            Tech.
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="col-span-1 md:col-span-2">
          <ShopFilters />
        </div>
        <div className="col-span-1 md:col-span-10">
          <ShopProducts />
        </div>
      </div>
    </section>
  );
};

export default Shop;
