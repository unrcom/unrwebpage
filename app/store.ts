import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import navigatorReducer from "../features/navigator/navigatorSlice";
import authReducer from "../features/auth/authSlice";
import logReducer from "../features/log/logSlice";
import sanmokuReducer from "../features/sanmoku/sanmokuSlice";
import sanmokuOnlineReducer from "../features/sanmokuOnline/sanmokuOnlineSlice";

export const store = configureStore({
  reducer: {
    navigator: navigatorReducer,
    auth: authReducer,
    log: logReducer,
    sanmoku: sanmokuReducer,
    sanmokuOnline: sanmokuOnlineReducer,
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
