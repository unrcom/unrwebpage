import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  voteMod2,
  selectSelectedVote,
  selectSelectedVoteIdx,
} from "../features/navigator/navigatorSlice";
import None from "./None";

import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";

interface PROPS {
  key: number;
  idx: number;
  a: string[];
}

const AsMeisai: React.FC<PROPS> = (props) => {
  const selectedVote = useSelector(selectSelectedVote);
  const selectedVoteIdx = useSelector(selectSelectedVoteIdx);
  const dispatch = useDispatch();

  let as = "回答が設定されていません";
  if (props.idx === selectedVoteIdx.idx) {
    for (let i = 0; i < props.a.length; i++) {
      if (i == 0) {
        as = `[${props.a[i]}]`;
      } else {
        as = as + `, [${props.a[i]}]`;
      }
    }
  }

  return (
    <>
      {props.idx === selectedVoteIdx.idx ? (
        <TableCell>
          <span>{as}</span>
        </TableCell>
      ) : (
        <None />
      )}
    </>
  );
};

export default AsMeisai;
