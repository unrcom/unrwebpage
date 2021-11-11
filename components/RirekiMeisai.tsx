import React from "react";

import TableCell from "@mui/material/TableCell";

interface PROPS {
  key: string;
  tms: string;
  dmn: string;
  lvl: string;
  app: string;
  mss: string;
}

const RirekiMeisai: React.FC<PROPS> = (props) => {
  return (
    <>
      <TableCell>
        <span>{props.tms}</span>
      </TableCell>
      <TableCell>
        <span>{props.dmn}</span>
      </TableCell>
      <TableCell>
        <span>{props.lvl}</span>
      </TableCell>
      <TableCell>
        <span>{props.app}</span>
      </TableCell>
      <TableCell>
        <span>{props.mss}</span>
      </TableCell>
    </>
  );
};

export default RirekiMeisai;
