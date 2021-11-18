import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteMod2 } from "../features/navigator/navigatorSlice";

import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";

interface PROPS {
  key: number;
  idx: number;
  desc: string;
  type: string;
  a: string[];
}

const QasMeisai: React.FC<PROPS> = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      <TableCell>
        <span>{props.idx}</span>
      </TableCell>
      <TableCell>
        <span>{props.desc}</span>
      </TableCell>
      {props.type === "１択" || props.type === "複数選択" ? (
        <Button variant="text" onClick={() => dispatch(voteMod2(props.idx))}>
          <TableCell>
            <span>{props.type}</span>
          </TableCell>
        </Button>
      ) : (
        <TableCell>
          <span>{props.type}</span>
        </TableCell>
      )}
    </>
  );
};

export default QasMeisai;
