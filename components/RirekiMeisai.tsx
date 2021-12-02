import React from "react";

import TableCell from "@mui/material/TableCell";

interface PROPS {
  tms: string;
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
