import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectUser } from "../features/auth/authSlice";
import { Log, selectLogRecordCountMax } from "../features/log/logSlice";

import { db } from "../firebase";
import {
  collection,
  query,
  onSnapshot,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

const Rireki: React.FC = () => {
  const user = useSelector(selectUser);
  const logRecordCountMax = useSelector(selectLogRecordCountMax);
  const [logs, setLogs] = useState<Log[]>([
    {
      created_at: null,
      providerId: "",
      uid: "",
      domain: "",
      level: "",
      app: "",
      message: "",
    },
  ]);

  useEffect(() => {
    const q = query(
      collection(db, "logs"),
      where("providerId", "==", user.providerId),
      where("uid", "==", user.uid),
      orderBy("created_at", "desc"),
      limit(logRecordCountMax.value)
    );
    const unSub = onSnapshot(q, (snapshot) => {
      setLogs(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          created_at: doc.data().created_at,
          providerId: doc.data().providerId,
          uid: doc.data().uid,
          domain: doc.data().domain,
          level: doc.data().level,
          app: doc.data().app,
          message: doc.data().message,
        }))
      );
    });
    return () => {
      unSub();
    };
  }, []);

  return <div></div>;
};

export default Rireki;
