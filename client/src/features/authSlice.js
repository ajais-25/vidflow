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
      saveState(sessionKey, null);
    },
    updateAvatar: (state, action) => {
      state.user.avatar = action.payload.avatar;
      saveState(sessionKey, state.user);
    },
    updateAccount: (state, action) => {
      state.user.fullName = action.payload.name;
      state.user.email = action.payload.email;
      saveState(sessionKey, state.user);
    },
  },
});

export const { login, logout, updateAvatar, updateAccount } = authSlice.actions;
export default authSlice.reducer;
