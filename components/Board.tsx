import React from "react";

import Square from "./Square";
import styles from "./Board.module.css";

const Board: React.FC = () => {
  const renderSquare = (i: number) => {
    return <Square idx={i} />;
  };

  return (
    <div>
      <div className={styles.boardrow}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className={styles.boardrow}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className={styles.boardrow}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

export default Board;
