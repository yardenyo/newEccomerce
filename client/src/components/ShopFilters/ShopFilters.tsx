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
import Helpers from "@/helpers/app.helpers";
import { Divider } from "primereact/divider";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  category?: string;
};

const ShopFilters = (props: Props) => {
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);

  const payload = {
    sortBy: "createdAt",
    sortOrder: 0,
  };

  const { data: response } = useGetAllCategoriesQuery(payload);

  const newData = useMemo(() => {
    const categories = response?.data || [];

    const allCategories = {
      _id: "all",
      name: "All Categories",
    };
    return [allCategories, ...categories];
  }, [response?.data]);

  useEffect(() => {
    if (props.category) {
      const category = newData.find(
        (category) => category._id === props.category
      );
      if (category) {
        dispatch(setCategory(category));
      }
    } else {
      if (filters.category._id !== "all") {
        navigate(`/shop/${filters.category._id}`, { replace: true });
      }
    }
  }, [props.category, newData, dispatch, filters.category._id, navigate]);

  const handleSetCategory = (category: { _id: string; name: string }) => {
    dispatch(setCategory(category));
    navigate(`/shop/${category._id}`, { replace: true });
  };

  return (
    <div className="flex flex-col space-y-4">
      <Divider className="block md:hidden" />
      <div
        className="title cursor-pointer md:cursor-auto"
        onClick={() => setShowFilters(!showFilters)}
      >
        <h1 className="text-xl font-bold flex space-x-2 items-center">
          <span>
            <i className="pi pi-sliders-h"></i>
          </span>
          <span>Filters</span>
        </h1>
      </div>
      <Divider className="block md:hidden" />
      <div
        className={`md:grid md:grid-cols-1 gap-4 ${
          showFilters ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col space-y-2">
          <div className="text-lg font-semibold">Categories</div>
          <div className="flex flex-col space-y-2">
            {newData.map((category: Category) => (
              <div
                key={category._id}
                className={`flex items-center justify-between cursor-pointer ${
                  filters.category._id === category._id
                    ? "underline font-semibold"
                    : ""
                }`}
                onClick={() => {
                  if (filters.category._id === category._id) {
                    handleSetCategory({ _id: "all", name: "All Categories" });
                  } else {
                    handleSetCategory(category);
                  }
                }}
              >
                {Helpers.capitalizeFirstLetter(category.name)}
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
