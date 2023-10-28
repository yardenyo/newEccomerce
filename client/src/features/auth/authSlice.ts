import { AuthState } from "@/types/auth";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
  },
  reducers: {
    setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
    },
    setUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setAccessToken, setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: AuthState) => state.auth.user;
export const selectAccessToken = (state: AuthState) => state.auth.accessToken;
