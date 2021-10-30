import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import navigatorReducer from "../features/navigator/navigatorSlice";
import authReducer from "../features/auth/authSlice";
import logReducer from "../features/log/logSlice";

import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

// const reducers = combineReducers({
//   navigator: navigatorReducer,
//   auth: authReducer,
//   log: logReducer,
// });

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: {
    navigator: navigatorReducer,
    auth: authReducer,
    log: logReducer,
    //reducer: persistedReducer,
    //  devTools: process.env.NODE_ENV !== "production",
    //  middleware: [thunk],
    //},
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
