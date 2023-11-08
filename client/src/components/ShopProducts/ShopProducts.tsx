import ProductContent from "@/components/Products/ProductContent";
import { selectFilters } from "@/features/shopFilters/shopFiltersSlice";
import Helpers from "@/helpers/app.helpers";
import { useSelector } from "react-redux";

const ShopProducts = () => {
  const filters = useSelector(selectFilters);

  const data = {
    payload: {
      sortBy: "createdAt",
      sortOrder: 0,
      resultsPerPage: 10,
    },
  };

  return (
    <section className="flex flex-col">
      <div className="flex justify-between items-center ">
        <div className="text-xl font-bold">
          {Helpers.capitalizeFirstLetter(filters.category.name)}
        </div>
        <div className="flex space-x-4">
          <div>
            Sort By{" "}
            <span>
              <i className=""></i>
            </span>
          </div>
          <div>Rectangle</div>
        </div>
      </div>
      <ProductContent {...data} />
    </section>
  );
};

export default ShopProducts;
