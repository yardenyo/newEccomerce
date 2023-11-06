import { createSlice } from "@reduxjs/toolkit";
import { WishlistState } from "@/types";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
  },
  reducers: {
    setWishlist: (state, action) => {
      const { wishlist } = action.payload;
      state.wishlist = wishlist;
    },
    clearWishlist: (state) => {
      state.wishlist = [];
    },
  },
});

export const { setWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;

export const selectWishlist = (state: WishlistState) => state.wishlist.wishlist;
