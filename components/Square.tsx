import React from "react";
import styles from "./Square.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrent, add } from "../features/sanmoku/sanmokuSlice";

interface PROPS {
  idx: number;
}

const Square: React.FC<PROPS> = (props) => {
  const current = useSelector(selectCurrent);
  const dispatch = useDispatch();
  return (
    <>
      <button
        className={styles.square}
        onClick={() => dispatch(add(props.idx))}
      >
        {current.squares[props.idx]}
      </button>
    </>
  );
};

export default Square;
