import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectUser } from "../features/auth/authSlice";
import { logAdd, Log, Logs } from "../features/log/logSlice";
import RirekiMeisai from "./RirekiMeisai";

import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { green } from "@mui/material/colors";

const Rireki: React.FC = () => {
  const user = useSelector(selectUser);
  const [logs, setLogs] = useState([
    {
      tms: "",
      dmn: "",
      lvl: "",
      app: "",
      mss: "",
    },
  ]);

  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef<number>();
  const [delcount, setDelcount] = React.useState(0);

  useEffect(() => {
    console.log("Rireki.tsx useEffect 1st");
    const fetchLogs = async () => {
      const logsId = `${user.providerId}_${user.uid}`;
      const docRef = doc(db, "logs", logsId);
      const docSnap = await getDoc(docRef);
      console.log("Rireki.tsx fetchLogs() getDoc()");
      const newlogs: Array<Log> = [];
      let logsDoc: Logs = {
        lastupdate_at: null,
        logs: [
          {
            tms: "",
            dmn: "",
            lvl: "",
            app: "",
            mss: "",
          },
        ],
      };
      if (docSnap.exists()) {
        logsDoc.logs = docSnap.data().logs;
        for (const log of logsDoc.logs) {
          newlogs.push({
            tms: log.tms,
            dmn: log.dmn,
            lvl: log.lvl,
            app: log.app,
            mss: log.mss,
          });
          if (log.mss === "全履歴削除") {
            break;
          }
        }

        setLogs(
          newlogs.map((doc) => ({
            tms: doc.tms,
            dmn: doc.dmn,
            lvl: doc.lvl,
            app: doc.app,
            mss: doc.mss,
          }))
        );
      }
    };
    window.setTimeout(fetchLogs, 1500);
  }, [user.providerId, user.uid, delcount]);

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  React.useEffect(() => {
    console.log("Rireki.tsx useEffect 2nd");
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    dispatch(
      logAdd({
        loguser: { providerId: user.providerId, uid: user.uid },
        log: {
          tms: null,
          dmn: user.domain,
          lvl: "Info",
          app: "Auth",
          mss: "全履歴削除",
        },
      })
    );
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
    setDelcount(delcount + 1);
  };

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
                    key={log.tms}
                    tms={log.tms}
                    dmn={log.dmn}
                    lvl={log.lvl}
                    app={log.app}
                    mss={log.mss}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Container component="main" maxWidth="xs">
            <Box mt={6}>履歴が多すぎますか？　すべて削除できます。</Box>
            <Box mt={3}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ m: 1, position: "relative" }}>
                  <Button
                    variant="contained"
                    sx={buttonSx}
                    disabled={loading}
                    onClick={handleButtonClick}
                  >
                    全履歴を削除
                  </Button>
                  {loading && (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: green[500],
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        marginTop: "-12px",
                        marginLeft: "-12px",
                      }}
                    />
                  )}
                </Box>
                <Box sx={{ m: 1, position: "relative" }}>
                  <Fab
                    aria-label="save"
                    color="primary"
                    sx={buttonSx}
                    onClick={handleButtonClick}
                  >
                    {success ? <CheckIcon /> : <DeleteIcon />}
                  </Fab>
                  {loading && (
                    <CircularProgress
                      size={68}
                      sx={{
                        color: green[500],
                        position: "absolute",
                        top: -6,
                        left: -6,
                        zIndex: 1,
                      }}
                    />
                  )}
                </Box>
              </Box>
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
