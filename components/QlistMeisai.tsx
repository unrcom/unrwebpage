import React from "react";
//import * as React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { voteMod } from "../features/navigator/navigatorSlice";

import { selectUser } from "../features/auth/authSlice";
import { Q } from "./Vote";

import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import EditIcon from "@mui/icons-material/Edit";

interface PROPS {
  key: string;
  title: string;
  stat: string;
  as_max_count: number;
  released_at: string;
  stoped_at: string;
  id: string;
}

const QlistMeisai: React.FC<PROPS> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [inputText, setInputText] = React.useState("");
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const selectedLine = () => {
    dispatch(voteMod(props.id));
  };

  const fetchAsyncUpdateTitle = async (inputText: string) => {
    let tmpQslist: Array<Q> = [];
    const qsId = `${user.providerId}_${user.uid}`;
    const docRef = doc(db, "qslist", qsId);
    const docSnap = await getDoc(docRef);
    console.log("Vote.tsx fetchQslist() getDoc()");

    if (docSnap.exists()) {
      tmpQslist = docSnap.data().q;
    }
  };

  return (
    <>
      <TableCell>
        <IconButton
          size="small"
          onClick={() => {
            handleOpen();
          }}
        >
          <EditIcon />
        </IconButton>
      </TableCell>
      <TableCell>
        <span>{props.title}</span>
      </TableCell>
      <TableCell>
        <span>{props.stat}</span>
      </TableCell>
      <TableCell>
        <span>{props.as_max_count}</span>
      </TableCell>
      <TableCell>
        <span>{props.released_at}</span>
      </TableCell>
      <TableCell>
        <span>{props.stoped_at}</span>
      </TableCell>
      <TableCell>
        <Button
          variant="text"
          size="small"
          onClick={() => {
            selectedLine();
          }}
        >
          <span>{props.id}</span>
        </Button>
      </TableCell>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <TextField
            id="modal-modal-title"
            InputLabelProps={{
              shrink: true,
            }}
            label="タイトル"
            type="text"
            value={inputText}
            onChange={handleInputTextChange}
          />
          <Button
            id="modal-modal-description"
            sx={{ mt: 2 }}
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              dispatch(fetchAsyncUpdateTitle(inputText));
              handleClose();
            }}
          >
            SAVE
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default QlistMeisai;
