import { useGetAllCategoriesQuery } from "@/features/categories/categoriesApiSlice";
import { ShopPriceFilters, shopRatingFilters } from "@/constants/ShopFilters";
import {
  setCategory,
  togglePriceCheckbox,
  toggleRatingCheckbox,
  selectFilters,
} from "@/features/shopFilters/shopFiltersSlice";
import { useSelector, useDispatch } from "react-redux";
import { Category } from "@/types";
import Filter from "@/components/ShopFilters/Filter";

const ShopFilters = () => {
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  const payload = {
    sortBy: "createdAt",
    sortOrder: 0,
  };

  const { data: response } = useGetAllCategoriesQuery(payload);
  const categories = response?.data || [];

  const allCategories = {
    _id: "all",
    name: "All Categories",
  };

  const newData = [allCategories, ...categories];

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="title">
        <h1 className="text-xl font-bold flex space-x-2 items-center">
          <span>
            <i className="pi pi-sliders-h"></i>
          </span>
          <span>Filters</span>
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col space-y-2">
          <div className="text-lg font-semibold">Categories</div>
          <div className="flex flex-col space-y-2">
            {newData.map((category: Category) => (
              <div
                key={category._id}
                className={`flex items-center justify-between cursor-pointer ${
                  filters.category === category._id
                    ? "underline font-semibold"
                    : ""
                }`}
                onClick={() => {
                  if (filters.category === category._id) {
                    dispatch(setCategory("all"));
                  } else {
                    dispatch(setCategory(category._id));
                  }
                }}
              >
                {capitalizeFirstLetter(category.name)}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="text-lg font-semibold">Price</div>
          <div className="flex flex-col space-y-2">
            {ShopPriceFilters.map((priceFilter, index) => (
              <Filter
                key={index}
                name={priceFilter.name}
                checked={filters.priceCheckedState[index]}
                onChange={() =>
                  dispatch(
                    togglePriceCheckbox({
                      position: index,
                      price: [priceFilter.min, priceFilter.max],
                    })
                  )
                }
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="text-lg font-semibold">Rating</div>
          <div className="flex flex-col space-y-2">
            {shopRatingFilters.map((ratingFilter, index) => (
              <Filter
                key={index}
                name={ratingFilter.name}
                checked={filters.ratingCheckedState[index]}
                onChange={() =>
                  dispatch(
                    toggleRatingCheckbox({
                      position: index,
                      rating: [ratingFilter.min, ratingFilter.max],
                    })
                  )
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopFilters;
