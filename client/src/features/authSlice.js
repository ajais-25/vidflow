import { loadState, saveState } from "../helper/sessionStorage";
import { createSlice } from "@reduxjs/toolkit";

const sessionKey = "user";

const initialState = {
  user: loadState(sessionKey, null),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      saveState(sessionKey, action.payload.user);
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
