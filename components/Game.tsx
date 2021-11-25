import React from "react";
import Board from "./Board";
import styles from "./Game.module.css";

const Game: React.FC = () => {
  return (
    <div className={styles.game}>
      <div className={styles.gameboard}>
        <Board />
      </div>
      <div className={styles.gameinfo}>
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
};

export default Game;
