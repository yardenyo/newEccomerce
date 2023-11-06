import brands from "@/constants/BrandLogos";

const Brands = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-5 md:flex gap-4">
        {brands.map((brand) => (
          <div key={brand.name} className="flex justify-center items-center">
            <img src={brand.logo} alt={brand.name} className="w-24 h-24" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
