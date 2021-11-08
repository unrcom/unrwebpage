import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface USERPROFILE {
  providerId: string;
  uid: string;
  domain: string;
  rool: string;
  displayName: string;
  providerDisplayName: string;
  photoUrl: string;
}

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      providerId: "",
      uid: "",
      domain: "",
      rool: "",
      displayName: "",
      providerDisplayName: "",
      photoUrl: "",
    },
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = {
        providerId: "",
        uid: "",
        domain: "",
        rool: "",
        displayName: "",
        providerDisplayName: "",
        photoUrl: "",
      };
    },
    updateUserProfile: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, updateUserProfile } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
