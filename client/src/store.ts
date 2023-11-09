import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/api/apiSlice";
import authReducer from "@/features/auth/authSlice";
import cartReducer from "@/features/cart/cartSlice";
import wishlistReducer from "@/features/wishlist/wishlistSlice";
import shopFiltersReducer from "@/features/shopFilters/shopFiltersSlice";
import shopProductsReducer from "./features/products/shopProductsSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    shopFilters: shopFiltersReducer,
    shopProducts: shopProductsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
