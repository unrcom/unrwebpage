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
  offline: boolean;
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
      offline: false,
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
        offline: false,
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
