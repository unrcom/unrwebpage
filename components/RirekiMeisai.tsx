import React from "react";

import TableCell from "@mui/material/TableCell";

interface PROPS {
  key: string;
  created_at: string;
  providerId: string;
  uid: string;
  domain: string;
  level: string;
  app: string;
  message: string;
}

const RirekiMeisai: React.FC<PROPS> = (props) => {
  return (
    <>
      <TableCell>
        <span>{props.created_at}</span>
      </TableCell>
      <TableCell>
        <span>{props.domain}</span>
      </TableCell>
      <TableCell>
        <span>{props.level}</span>
      </TableCell>
      <TableCell>
        <span>{props.app}</span>
      </TableCell>
      <TableCell>
        <span>{props.message}</span>
      </TableCell>
    </>
  );
};

export default RirekiMeisai;
