import { createSlice } from "@reduxjs/toolkit";
import { ShopFiltersState } from "@/types";

const defaultState = {
  categories: ["all"],
  price: [0, 999999],
  rating: [0, 5],
  priceCheckedState: new Array(5).fill(false),
  ratingCheckedState: new Array(4).fill(false),
};

const shopFiltersSlice = createSlice({
  name: "shopFilters",
  initialState: {
    filters: {
      categories: defaultState.categories,
      price: defaultState.price,
      rating: defaultState.rating,
      priceCheckedState: defaultState.priceCheckedState,
      ratingCheckedState: defaultState.ratingCheckedState,
    },
  },
  reducers: {
    pushCategory: (state, action) => {
      state.filters.categories.push(action.payload);
    },
    removeCategory: (state, action) => {
      state.filters.categories = state.filters.categories.filter(
        (category) => category !== action.payload
      );
    },
    togglePriceCheckbox: (state, action) => {
      const { position, price } = action.payload;
      state.filters.priceCheckedState = state.filters.priceCheckedState.map(
        (item, index) => (index === position ? !item : false)
      );

      if (state.filters.priceCheckedState[position]) {
        state.filters.price = price;
      } else {
        state.filters.price = defaultState.price;
      }
    },
    toggleRatingCheckbox: (state, action) => {
      const { position, rating } = action.payload;
      state.filters.ratingCheckedState = state.filters.ratingCheckedState.map(
        (item, index) => (index === position ? !item : false)
      );

      if (state.filters.ratingCheckedState[position]) {
        state.filters.rating = rating;
      } else {
        state.filters.rating = defaultState.rating;
      }
    },
  },
});

export const {
  pushCategory,
  removeCategory,
  togglePriceCheckbox,
  toggleRatingCheckbox,
} = shopFiltersSlice.actions;

export default shopFiltersSlice.reducer;

export const selectFilters = (state: ShopFiltersState) =>
  state.shopFilters.filters;
