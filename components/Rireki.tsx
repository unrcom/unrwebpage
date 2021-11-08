import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectUser } from "../features/auth/authSlice";
import { selectLogRecordCountMax, Log } from "../features/log/logSlice";
import RirekiMeisai from "./RirekiMeisai";
import CircularIntegration from "./CircularIntegration";

import { db } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";

import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import dayjs from "dayjs";

const Rireki: React.FC = () => {
  const user = useSelector(selectUser);
  const logRecordCountMax = useSelector(selectLogRecordCountMax);
  const [logs, setLogs] = useState([
    {
      id: "",
      created_at: "",
      providerId: "",
      uid: "",
      domain: "",
      level: "",
      app: "",
      message: "",
    },
  ]);

  useEffect(() => {
    // const fetchLogs = async () => {
    //   const newlogs: Array<Log> = [];
    //   const logsName = `${user.providerId}_${user.uid}_logs`;
    //   const q = query(
    //     collection(db, logsName),
    //     orderBy("created_at", "desc"),
    //     limit(logRecordCountMax.value)
    //   );
    //   let deleteFlag = 0;
    //   const querySnapshot = await getDocs(q);
    //   querySnapshot.forEach((doc) => {
    //     if (deleteFlag === 0) {
    //       newlogs.push({
    //         id: doc.id,
    //         created_at: dayjs.unix(doc.data().created_at.seconds).format(),
    //         providerId: doc.data().providerId,
    //         uid: doc.data().uid,
    //         domain: doc.data().domain,
    //         level: doc.data().level,
    //         app: doc.data().app,
    //         message: doc.data().message,
    //       });
    //     }
    //     if (doc.data().message === "全履歴削除") {
    //       deleteFlag = 1;
    //     }
    //   });
    //   console.log(newlogs);
    //   setLogs(
    //     newlogs.map((doc) => ({
    //       id: doc.id,
    //       created_at: doc.created_at,
    //       providerId: doc.providerId,
    //       uid: doc.uid,
    //       domain: doc.domain,
    //       level: doc.level,
    //       app: doc.app,
    //       message: doc.message,
    //     }))
    //   );
    // };
    const fetchLogs = async () => {
      const wklogs: Array<Log> = [];
      const logsId = `${user.providerId}_${user.uid}`;
      const docRef = doc(db, "logs", logsId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    let deleteFlag = 0;
    //for
    //   const querySnapshot = await getDocs(q);
    //   querySnapshot.forEach((doc) => {
    //     if (deleteFlag === 0) {
    //       newlogs.push({
    //         id: doc.id,
    //         created_at: dayjs.unix(doc.data().created_at.seconds).format(),
    //         providerId: doc.data().providerId,
    //         uid: doc.data().uid,
    //         domain: doc.data().domain,
    //         level: doc.data().level,
    //         app: doc.data().app,
    //         message: doc.data().message,
    //       });
    //     }
    //     if (doc.data().message === "全履歴削除") {
    //       deleteFlag = 1;
    //     }
    //   });
    //   console.log(newlogs);
    //   setLogs(
    //     newlogs.map((doc) => ({
    //       id: doc.id,
    //       created_at: doc.created_at,
    //       providerId: doc.providerId,
    //       uid: doc.uid,
    //       domain: doc.domain,
    //       level: doc.level,
    //       app: doc.app,
    //       message: doc.message,
    //     }))
    //   );
    // };
    window.setTimeout(fetchLogs, 1500);
    console.log("Rireki.tsx useEffect 1st");
  }, [logRecordCountMax.value, user.providerId, user.uid]);

  return (
    <>
      {user.uid ? (
        <>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>日時</TableCell>
                <TableCell>Domain</TableCell>
                <TableCell>ログレベル</TableCell>
                <TableCell>アプリ</TableCell>
                <TableCell>メッセージ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log) => (
                <TableRow>
                  <RirekiMeisai
                    key={log.id}
                    created_at={log.created_at}
                    providerId={log.providerId}
                    uid={log.uid}
                    domain={log.domain}
                    level={log.level}
                    app={log.app}
                    message={log.message}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Container component="main" maxWidth="xs">
            <Box mt={6}>履歴が多すぎますか？　すべて削除できます。</Box>
            <Box mt={3}>
              <CircularIntegration />
            </Box>
          </Container>
        </>
      ) : (
        "認証　でログインすると本サイトの操作履歴を確認できます。"
      )}
    </>
  );
};

export default Rireki;
