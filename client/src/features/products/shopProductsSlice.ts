import { createSlice } from "@reduxjs/toolkit";
import { ShopProductsState } from "@/types";

const shopProductsSlice = createSlice({
  name: "shopProducts",
  initialState: {
    products: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = shopProductsSlice.actions;

export default shopProductsSlice.reducer;

export const selectProducts = (state: ShopProductsState) =>
  state.shopProducts.products;
export const selectLoading = (state: ShopProductsState) =>
  state.shopProducts.loading;
