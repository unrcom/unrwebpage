import React from "react";
import styles from "./Square.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTaisenRireki,
  add,
} from "../features/sanmokuOnline/sanmokuOnlineSlice";

interface PROPS {
  idx: number;
}

const Square3Online: React.FC<PROPS> = (props) => {
  const taisenRireki = useSelector(selectTaisenRireki);
  const dispatch = useDispatch();
  return (
    <>
      <button
        className={styles.square}
        onClick={() => dispatch(add(props.idx))}
      >
        {taisenRireki.squares[props.idx]}
      </button>
    </>
  );
};

export default Square3Online;
