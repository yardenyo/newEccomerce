import ProductContent from "@/components/Products/ProductContent";
import { selectFilters } from "@/features/shopFilters/shopFiltersSlice";
import Helpers from "@/helpers/app.helpers";
import { useSelector } from "react-redux";
import LoadingSpinner from "@/components/Layout/Loading";
import { useGetAllProductsQuery } from "@/features/products/productsApiSlice";
import { Product } from "@/types";

const ShopProducts = () => {
  const filters = useSelector(selectFilters);

  const payload = {
    sortBy: "createdAt",
    sortOrder: 0,
    resultsPerPage: 10,
  };

  const {
    data: response,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery({
    ...payload,
    filters,
  });

  const loading = isLoading || isFetching;

  const products: Product[] = response?.data || [];

  const data = {
    products,
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
      {loading ? <LoadingSpinner /> : <ProductContent {...data} />}
    </section>
  );
};

export default ShopProducts;
