import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
      //   state.user.displayName = action.payload;
      //   state.user.domain = action.payload;
      // providerId: action.payload.providerId,
      // uid: action.payload.uid,
      // domain: action.payload.domain,
      // rool: action.payload.rool,
      // displayName: action.payload.displayName,
      // providerDisplayName: action.payload.providerDisplayName,
      // photoUrl: action.payload.photoUrl,
      //   };
    },
  },
});

export const { login, logout, updateUserProfile } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
