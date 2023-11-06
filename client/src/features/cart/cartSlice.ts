import { createSlice } from "@reduxjs/toolkit";
import { CartState } from "@/types";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
  },
  reducers: {
    initCart: (state, action) => {
      const { cart } = action.payload;
      state.cart = cart;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    clearCart: (state) => {
      state.cart = null;
    },
  },
});

export const { initCart, setCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

export const selectCart = (state: CartState) => state.cart.cart;
