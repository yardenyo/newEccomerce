import { useGetAllCategoriesQuery } from "@/features/categories/categoriesApiSlice";
import {
  pushCategory,
  removeCategory,
  togglePriceCheckbox,
  toggleRatingCheckbox,
  selectFilters,
} from "@/features/shopFilters/shopFiltersSlice";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox } from "primereact/checkbox";
import { Category } from "@/types";

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
      {filters.categories.map((category: string) => (
        <div key={category}>{category}</div>
      ))}
      {filters.price.map((price: number) => (
        <div key={price}>{price}</div>
      ))}
      {filters.rating.map((rating: number) => (
        <div key={rating}>{rating}</div>
      ))}
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col space-y-2">
          <div className="text-lg font-semibold">Categories</div>
          <div className="flex flex-col space-y-2">
            {newData.map((category: Category) => (
              <div
                key={category._id}
                className={`flex items-center justify-between cursor-pointer ${
                  filters.categories.includes(category._id)
                    ? "underline font-semibold"
                    : ""
                }`}
                onClick={() => {
                  if (filters.categories.includes(category._id)) {
                    dispatch(removeCategory(category._id));
                  } else {
                    dispatch(pushCategory(category._id));
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
            <div className="flex items-center justify-between">
              <span>Less than $25</span>
              <Checkbox
                checked={filters.priceCheckedState[0]}
                onChange={() =>
                  dispatch(togglePriceCheckbox({ position: 0, price: [0, 25] }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <span>$25 - $50</span>
              <Checkbox
                checked={filters.priceCheckedState[1]}
                onChange={() =>
                  dispatch(
                    togglePriceCheckbox({ position: 1, price: [25, 50] })
                  )
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <span>$50 - $100</span>
              <Checkbox
                checked={filters.priceCheckedState[2]}
                onChange={() =>
                  dispatch(
                    togglePriceCheckbox({ position: 2, price: [50, 100] })
                  )
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <span>$100 - $200</span>
              <Checkbox
                checked={filters.priceCheckedState[3]}
                onChange={() =>
                  dispatch(
                    togglePriceCheckbox({ position: 3, price: [100, 200] })
                  )
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <span>$200 and above</span>
              <Checkbox
                checked={filters.priceCheckedState[4]}
                onChange={() =>
                  dispatch(
                    togglePriceCheckbox({ position: 4, price: [200, 999999] })
                  )
                }
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="text-lg font-semibold">Rating</div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <span>4+ Stars</span>
              <Checkbox
                checked={filters.ratingCheckedState[0]}
                onChange={() => {
                  dispatch(
                    toggleRatingCheckbox({ position: 0, rating: [4, 5] })
                  );
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>3+ Stars</span>
              <Checkbox
                checked={filters.ratingCheckedState[1]}
                onChange={() => {
                  dispatch(
                    toggleRatingCheckbox({ position: 1, rating: [3, 5] })
                  );
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>2+ Stars</span>
              <Checkbox
                checked={filters.ratingCheckedState[2]}
                onChange={() => {
                  dispatch(
                    toggleRatingCheckbox({ position: 2, rating: [2, 5] })
                  );
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>1+ Stars</span>
              <Checkbox
                checked={filters.ratingCheckedState[3]}
                onChange={() => {
                  dispatch(
                    toggleRatingCheckbox({ position: 3, rating: [1, 5] })
                  );
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopFilters;
