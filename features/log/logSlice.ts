import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import { db } from "../../firebase";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { NoEncryption } from "@material-ui/icons";

export interface LogRecordCountMax {
  value: number;
}

export interface LogUser {
  providerId: string;
  uid: string;
}

export interface Log {
  created_at: any;
  domain: string;
  level: string;
  app: string;
  message: string;
}

export interface AddLog {
  loguser: LogUser;
  log: Log;
}

export interface Logs {
  logs: Log[];
}

export interface Logstatus {
  logRecordCountMax: LogRecordCountMax;
  loguser: LogUser;
  logs: Logs;
}

export interface DeleteLog {
  loguser: LogUser;
  log: Log;
}

const initialState: Logstatus = {
  logRecordCountMax: { value: 200 },
  loguser: { providerId: "", uid: "" },
  logs: {
    logs: [
      {
        created_at: null,
        domain: "",
        level: "",
        app: "",
        message: "",
      },
    ],
  },
};

const logAddAsync = async (addlog: AddLog) => {
  console.log(addlog);
  const logsId = `${addlog.loguser.providerId}_${addlog.loguser.uid}`;
  console.log(logsId);
  const docRef = doc(db, "logs", logsId);
  const docSnap = await getDoc(docRef);
  //let cfdoc: Logs;
  let cfdoc: any;
  if (docSnap.exists()) {
    cfdoc = docSnap.data();
    console.log(cfdoc);
    // if (cfdoc.logs.length > 2000) {
    //   cfdoc.logs.pop();
    // }
    cfdoc.logs.unshift(addlog.log);
  } else {
    cfdoc = {
      logs: [
        {
          created_at: addlog.log.created_at,
          domain: addlog.log.domain,
          level: addlog.log.level,
          app: addlog.log.app,
          message: addlog.log.message,
        },
      ],
    };
  }
  //cfdoc.logs[0].created_at = serverTimestamp();
  await setDoc(doc(db, "logs", logsId), cfdoc);
};

const logDelAsync = async (deleteLog: DeleteLog) => {
  const logsName = `${deleteLog.loguser.providerId}_${deleteLog.loguser.uid}_logs`;
  try {
    const docRef = await addDoc(collection(db, logsName), {
      created_at: serverTimestamp(),
      domain: deleteLog.log.domain,
      level: "Info",
      app: "Log",
      message: "全履歴削除",
    });
    console.log("AddDoc: logs (2nd)");
  } catch (e) {
    console.error("データベースアクセスエラー: ", e);
  }
  const logsId = `${deleteLog.loguser.providerId}_${deleteLog.loguser.uid}`;
  const docRef = doc(db, "logs", logsId);
  const docSnap = await getDoc(docRef);
  let cfdoc: any;
  if (docSnap.exists()) {
    cfdoc = docSnap.data();
    console.log(cfdoc);
    if (cfdoc.logs.length > 2000) {
      cfdoc.logs.pop();
    }
  }
  cfdoc.logs.unshift(deleteLog.log);
  await setDoc(doc(db, "logs", logsId), cfdoc);
};

export const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    logAdd: (state, action) => {
      logAddAsync(action.payload);
    },
    logDel: (state, action) => {
      logDelAsync(action.payload);
    },
  },
});

export const { logAdd, logDel } = logSlice.actions;

export const selectLogRecordCountMax = (state: RootState) =>
  state.log.logRecordCountMax;

export default logSlice.reducer;
