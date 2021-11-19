import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  voteMod2,
  selectSelectedVote,
  selectSelectedVoteIdx,
} from "../features/navigator/navigatorSlice";
import { selectUser } from "../features/auth/authSlice";
import None from "./None";
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
  key: number;
  idx: number;
  a: string[];
}

const AsMeisai: React.FC<PROPS> = (props) => {
  const [open, setOpen] = React.useState(false);
  const [inputText, setInputText] = React.useState("");
  const user = useSelector(selectUser);
  const selectedVote = useSelector(selectSelectedVote);
  const selectedVoteIdx = useSelector(selectSelectedVoteIdx);
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
            <span>{as}</span>
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
      ) : (
        <None />
      )}
    </>
  );
};

export default AsMeisai;
