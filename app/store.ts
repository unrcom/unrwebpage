import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import navigatorReducer from "../features/navigator/navigatorSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    navigator: navigatorReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
