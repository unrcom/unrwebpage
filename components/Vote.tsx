import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectUser } from "../features/auth/authSlice";
import {
  selectSelectedVote,
  selectSelectedVoteIdx,
} from "../features/navigator/navigatorSlice";
import QlistMeisai from "./QlistMeisai";
import QasMeisai from "./QasMeisai";
import AsMeisai from "./AsMeisai";
import None from "./None";

import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { RemoveFromQueue } from "@material-ui/icons";

export interface Q {
  title: string;
  stat: number;
  as_max_count: number;
  released_at: string;
  stoped_at: string;
  id: string;
}

interface Newq {
  title: string;
  stat: string;
  as_max_count: number;
  released_at: string;
  stoped_at: string;
  id: string;
}

interface Qslist {
  q: Q[];
}

interface Qas {
  desc: string;
  type: number;
  a: string[];
}

interface Qs {
  qas: Qas[];
}

interface Newqs {
  idx: number;
  desc: string;
  type: string;
  a: string[];
}

const Vote: React.FC = () => {
  const user = useSelector(selectUser);
  const selectedVote = useSelector(selectSelectedVote);
  const selectedVoteIdx = useSelector(selectSelectedVoteIdx);
  const dispatch = useDispatch();
  const [qlist, setQlist] = useState([
    {
      title: "",
      stat: "",
      as_max_count: 0,
      released_at: "",
      stoped_at: "",
      id: "",
    },
  ]);
  const [qs, setQs] = useState([
    {
      idx: 0,
      desc: "",
      type: "",
      a: [""],
    },
  ]);
  const [dataAri, setDataAri] = useState(false);
  const [dataOrUidNashi, setDataOrUidNashi] = useState(
    "認証　でログインするとアンケートの作成や、公開したアンケートへの回答結果を確認できます。"
  );
  const [selectedTitle, setSelectedTitle] = useState("");

  useEffect(() => {
    console.log("Vote.tsx useEffect 1st");
    const fetchQslist = async () => {
      let tmpQslist: Array<Q> = [];
      const newQs: Array<Newq> = [];
      const qsId = `${user.providerId}_${user.uid}`;
      const docRef = doc(db, "qslist", qsId);
      const docSnap = await getDoc(docRef);
      console.log("Vote.tsx fetchQslist() getDoc()");

      if (docSnap.exists()) {
        tmpQslist = docSnap.data().q;
        for (const q of tmpQslist) {
          let wkStat = "";
          if (q.stat === 0) {
            wkStat = "未公開";
          }
          if (q.stat === 1) {
            wkStat = "公開中";
          }
          if (q.stat === 2) {
            wkStat = "終了";
          }
          newQs.push({
            title: q.title,
            stat: wkStat,
            as_max_count: q.as_max_count,
            released_at: q.released_at,
            stoped_at: q.stoped_at,
            id: q.id,
          });
          setDataAri(true);
        }

        setQlist(
          newQs.map((doc: Newq) => ({
            title: doc.title,
            stat: doc.stat,
            as_max_count: doc.as_max_count,
            released_at: doc.released_at,
            stoped_at: doc.stoped_at,
            id: doc.id,
          }))
        );
      }
    };

    fetchQslist();

    if (user.uid) {
      if (dataAri === false) {
        setDataOrUidNashi("登録済みのデータはありません");
      }
    }
  }, []);

  useEffect(() => {
    console.log("Vote.tsx useEffect 2nd");
    const fetchQs = async () => {
      let tmpQs: Array<Qas> = [];
      const newQs: Array<Newqs> = [];
      const qsId = selectedVote.id;
      const docRef = doc(db, "qs", qsId);
      const docSnap = await getDoc(docRef);
      console.log("Vote.tsx fetchQs() getDoc()");
      if (docSnap.exists()) {
        tmpQs = docSnap.data().qas;
        let i = 1;
        for (const qas of tmpQs) {
          let wkType = "";
          if (qas.type === 0) {
            wkType = "回答不要";
          }
          if (qas.type === 1) {
            wkType = "１択";
          }
          if (qas.type === 2) {
            wkType = "複数選択";
          }
          if (qas.type === 3) {
            wkType = "段階評価";
          }
          if (qas.type === 4) {
            wkType = "自由記入";
          }
          //newQs.push({ key: i, desc: qas.desc, type: wkType });
          newQs.push({ idx: i, desc: qas.desc, type: wkType, a: qas.a });
          i = i + 1;
        }
      }
      setQs(
        newQs.map((doc: Newqs) => ({
          idx: doc.idx,
          desc: doc.desc,
          type: doc.type,
          a: doc.a,
        }))
      );
    };

    if (selectedVote.id) {
      fetchQs();
      for (const q of qlist) {
        if (q.id === selectedVote.id) {
          setSelectedTitle(q.title);
        }
      }
    }
  }, [selectedVote.id]);

  return (
    <>
      {selectedVoteIdx.idx > 0 ? (
        <>
          <Box mt={6}>
            <h3>設問 No {selectedVoteIdx.idx} の回答選択肢</h3>
          </Box>
          <Table size="small">
            <TableBody>
              <TableRow>
                {qs.map((qas) => (
                  <AsMeisai key={qas.idx} idx={qas.idx} a={qas.a} />
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </>
      ) : (
        <None />
      )}

      {selectedVote.id ? (
        <>
          <Box mt={6}>
            <h3>設問一覧 [{selectedTitle}]</h3>
          </Box>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>No.</TableCell>
                <TableCell>設問</TableCell>
                <TableCell>回答方法</TableCell>
              </TableRow>
            </TableHead>{" "}
            <TableBody>
              {qs.map((qas) => (
                <TableRow>
                  <QasMeisai
                    key={qas.idx}
                    idx={qas.idx}
                    desc={qas.desc}
                    type={qas.type}
                    a={qas.a}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <None />
      )}

      {/* {user.uid ? ( */}
      {user.uid && dataAri ? (
        <>
          <Box mt={6}>
            <h3>投票タイトル一覧</h3>
          </Box>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>タイトル</TableCell>
                <TableCell>ステータス</TableCell>
                <TableCell>回答上限数</TableCell>
                <TableCell>公開開始日時</TableCell>
                <TableCell>終了日時</TableCell>
                <TableCell>ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {qlist.map((q) => (
                <TableRow>
                  <QlistMeisai
                    key={q.id}
                    title={q.title}
                    stat={q.stat}
                    as_max_count={q.as_max_count}
                    released_at={q.released_at}
                    stoped_at={q.stoped_at}
                    id={q.id}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        `${dataOrUidNashi}`
      )}
    </>
  );
};

export default Vote;
