import React from "react";
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
  const [titleOpen, setTitleOpen] = React.useState(false);
  const [inputText, setInputText] = React.useState("");
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleTitleOpen = () => {
    setTitleOpen(true);
  };
  const handleTitleClose = () => {
    setTitleOpen(false);
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
      <Button
        variant="text"
        onClick={() => {
          handleTitleOpen();
          selectedLine();
        }}
      >
        <TableCell>
          <span>{props.title}</span>
        </TableCell>
      </Button>
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
        <span>{props.id}</span>
      </TableCell>

      <Modal open={titleOpen} onClose={handleTitleClose}>
        <>
          {/* <div style={modalStyle} className={classes.paper}> */}
          <TextField
            //   className={classes.field}
            InputLabelProps={{
              shrink: true,
            }}
            label="タイトル"
            type="text"
            value={inputText}
            onChange={handleInputTextChange}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            //   className={classes.saveModal}
            //   startIcon={<SaveIcon />}
            //   disabled={isCatDisabled}
            onClick={() => {
              dispatch(fetchAsyncUpdateTitle(inputText));
              handleTitleClose();
            }}
          >
            SAVE
          </Button>
          {/* </div> */}
        </>
      </Modal>
    </>
  );
};

export default QlistMeisai;
