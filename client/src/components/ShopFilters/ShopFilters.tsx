import { useGetAllCategoriesQuery } from "@/features/categories/categoriesApiSlice";
import { Checkbox } from "primereact/checkbox";
import { Category } from "@/types";
import { useState } from "react";

const ShopFilters = () => {
  const defaultCategories = ["all"];
  const [activeCategories, setActiveCategories] = useState(defaultCategories);
  const defaultPriceRange = [0, 999999];
  const [priceCheckedState, setPriceCheckedState] = useState(
    new Array(5).fill(false)
  );
  const [priceRange, setPriceRange] = useState(defaultPriceRange);
  const defaultRatingRange = [0, 5];
  const [ratingCheckedState, setRatingCheckedState] = useState(
    new Array(4).fill(false)
  );
  const [ratingRange, setRatingRange] = useState(defaultRatingRange);

  const handlePriceCheckbox = (position: number, priceRange: number[]) => {
    const updatedCheckedState = priceCheckedState.map((item, index) =>
      index === position ? !item : false
    );

    setPriceCheckedState(updatedCheckedState);
    if (updatedCheckedState[position]) {
      setPriceRange(priceRange);
    } else {
      setPriceRange(defaultPriceRange);
    }
  };

  const handleRatingCheckbox = (position: number, ratingRange: number[]) => {
    const updatedCheckedState = ratingCheckedState.map((item, index) =>
      index === position ? !item : false
    );

    setRatingCheckedState(updatedCheckedState);
    if (updatedCheckedState[position]) {
      setRatingRange(ratingRange);
    } else {
      setRatingRange(defaultRatingRange);
    }
  };

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
      {/* {activeCategories.map((category: string) => (
        <div key={category}>{category}</div>
      ))}
      {priceRange.map((price: number) => (
        <div key={price}>{price}</div>
      ))}
      {ratingRange.map((rating: number) => (
        <div key={rating}>{rating}</div>
      ))} */}
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col space-y-2">
          <div className="text-lg font-semibold">Categories</div>
          <div className="flex flex-col space-y-2">
            {newData.map((category: Category) => (
              <div
                key={category._id}
                className={`flex items-center justify-between cursor-pointer ${
                  activeCategories.includes(category._id)
                    ? "underline font-semibold"
                    : ""
                }`}
                onClick={() => {
                  if (activeCategories.includes(category._id)) {
                    setActiveCategories(
                      activeCategories.filter((item) => item !== category._id)
                    );
                  } else {
                    setActiveCategories([...activeCategories, category._id]);
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
                checked={priceCheckedState[0]}
                onChange={() => handlePriceCheckbox(0, [0, 25])}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>$25 - $50</span>
              <Checkbox
                checked={priceCheckedState[1]}
                onChange={() => handlePriceCheckbox(1, [25, 50])}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>$50 - $100</span>
              <Checkbox
                checked={priceCheckedState[2]}
                onChange={() => handlePriceCheckbox(2, [50, 100])}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>$100 - $200</span>
              <Checkbox
                checked={priceCheckedState[3]}
                onChange={() => handlePriceCheckbox(3, [100, 200])}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>$200 and above</span>
              <Checkbox
                checked={priceCheckedState[4]}
                onChange={() => handlePriceCheckbox(4, [200, 999999])}
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
                checked={ratingCheckedState[0]}
                onChange={() => {
                  handleRatingCheckbox(0, [4, 5]);
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>3+ Stars</span>
              <Checkbox
                checked={ratingCheckedState[1]}
                onChange={() => {
                  handleRatingCheckbox(1, [3, 5]);
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>2+ Stars</span>
              <Checkbox
                checked={ratingCheckedState[2]}
                onChange={() => {
                  handleRatingCheckbox(2, [2, 5]);
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span>1+ Stars</span>
              <Checkbox
                checked={ratingCheckedState[3]}
                onChange={() => {
                  handleRatingCheckbox(3, [1, 5]);
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
