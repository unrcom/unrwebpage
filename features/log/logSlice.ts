import { createSlice } from "@reduxjs/toolkit";
//import { RootState } from "../../app/store";

import { db } from "../../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

import dayjs from "dayjs";

export interface LogUser {
  providerId: string;
  uid: string;
}

export interface Log {
  tms: string;
  lvl: string;
  app: string;
  mss: string;
}

export interface Logs {
  lastupdate_at: any;
  logs: Log[];
}

export interface AddLog {
  loguser: LogUser;
  log: Log;
}

const logAddAsync = async (addlog: AddLog) => {
  const logRecordCountMax = 20;
  const logsId = `${addlog.loguser.providerId}_${addlog.loguser.uid}`;
  const docRef = doc(db, "logs", logsId);
  const docSnap = await getDoc(docRef);
  console.log("logSlice.ts logAddAsync() getDoc()");
  let logsDoc: Logs = {
    lastupdate_at: serverTimestamp(),
    logs: [
      {
        tms: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        lvl: addlog.log.lvl,
        app: addlog.log.app,
        mss: addlog.log.mss,
      },
    ],
  };
  if (docSnap.exists()) {
    logsDoc.logs = docSnap.data().logs;
    addlog.log.tms = dayjs().format("YYYY-MM-DD HH:mm:ss");
    logsDoc.logs.unshift(addlog.log);
    if (logsDoc.logs.length > logRecordCountMax) {
      logsDoc.logs.pop();
    }
  }
  await setDoc(doc(db, "logs", logsId), logsDoc);
  console.log("logSlice.ts logAddAsync() setDoc()");
};

export const logSlice = createSlice({
  name: "log",
  initialState: {},
  reducers: {
    logAdd: (state, action) => {
      logAddAsync(action.payload);
    },
  },
});

export const { logAdd } = logSlice.actions;

export default logSlice.reducer;
