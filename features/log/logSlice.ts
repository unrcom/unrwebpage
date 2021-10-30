import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export interface LogRecordCountMax {
  value: number;
}

export interface Log {
  created_at: any;
  providerId: string;
  uid: string;
  domain: string;
  level: string;
  app: string;
  message: string;
}

export interface Logs {
  logRecordCountMax: LogRecordCountMax;
  logs: Log[];
}

const initialState: Logs = {
  logRecordCountMax: { value: 200 },
  logs: [],
};

//export const logAddAsync = createAsyncThunk("log/logAdd", async (log: Log) => {
const logAddAsync = async (log: Log) => {
  try {
    const docRef = await addDoc(collection(db, "logs"), {
      created_at: serverTimestamp(),
      providerId: log.providerId,
      uid: log.uid,
      domain: log.domain,
      level: log.level,
      app: log.app,
      message: log.message,
    });
    console.log(docRef);
  } catch (e) {
    console.error("データベースアクセスエラー: ", e);
  }
};
//});

export const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    logUnshift: (state, action) => {
      state.logs.unshift(action.payload);
      logAddAsync(action.payload);
    },
    logAdd: (state, action) => {
      state.logs.push(action.payload);
    },
    logClear: (state) => {
      state.logs = [];
    },
  },
});

export const { logUnshift, logAdd, logClear } = logSlice.actions;

export const selectLogRecordCountMax = (state: RootState) =>
  state.log.logRecordCountMax;
export const selectLogs = (state: RootState) => state.log.logs;

export default logSlice.reducer;
