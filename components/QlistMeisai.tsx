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
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

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
  const [inputTitle, setInputTitle] = React.useState("");
  const [selectedStat, setSelectedStat] = React.useState(4);
  const [inputMaxCount, setInputMaxCount] = React.useState(0);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleInputTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  };

  const handleInputMaxCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMaxCount(Number(e.target.value));
  };
  const editQ = () => {
    setInputTitle(props.title);
  };

  const selectedLine = () => {
    dispatch(voteMod(props.id));
  };

  const fetchAsyncUpdateQlist = async () => {
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
            editQ();
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
            width: 800,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box>
            <TextField
              fullWidth
              id="modal-modal-title"
              InputLabelProps={{
                shrink: true,
              }}
              label="タイトル"
              type="text"
              value={inputTitle}
              onChange={handleInputTitleChange}
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">ステータス</FormLabel>
              <RadioGroup
                aria-label="stat"
                defaultValue="0"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="0"
                  control={<Radio />}
                  label="未公開"
                />
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="公開中"
                />
                <FormControlLabel value="2" control={<Radio />} label="終了" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField
              id="modal-modal-maxcount"
              InputLabelProps={{
                shrink: true,
              }}
              label="回答上限数"
              type="text"
              value={inputMaxCount}
              onChange={handleInputMaxCount}
            />
          </Box>
          <Box>
            <Button
              id="modal-modal-description"
              sx={{ mt: 2 }}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                fetchAsyncUpdateQlist();
                handleClose();
              }}
            >
              SAVE
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default QlistMeisai;
