import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../interfaces";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    authData: localStorage.getItem("ATK")
      ? JSON.parse(`${localStorage.getItem("ATK")}`)
      : undefined,
  },
  reducers: {
    login: (state: { authData: IUser }, action: { payload: IUser }) => {
      state.authData = action.payload;
    },
    updateData: (state: { authData: IUser }, action: { payload: IUser }) => {
      state.authData = action.payload;
    },

    logout: (state: { authData: undefined }) => {
      state.authData = undefined;
      localStorage.clear();
    },
  },
});

export const { login, logout, updateData } = authSlice.actions;

export default authSlice.reducer;
