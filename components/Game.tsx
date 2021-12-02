import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrent,
  mod,
  selectHistory,
  selectZahyo,
} from "../features/sanmoku/sanmokuSlice";
import { selectUser } from "../features/auth/authSlice";
import { logAdd } from "../features/log/logSlice";
import Board from "./Board";
import styles from "./Game.module.css";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const Game: React.FC = () => {
  const current = useSelector(selectCurrent);
  const history = useSelector(selectHistory);
  const zahyo = useSelector(selectZahyo);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const calculateWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        current.squares[a] !== "" &&
        current.squares[a] === current.squares[b] &&
        current.squares[a] === current.squares[c]
      ) {
        if (user.uid) {
          dispatch(
            logAdd({
              loguser: { providerId: user.providerId, uid: user.uid },
              log: {
                tms: null,
                dmn: user.domain,
                lvl: "Info",
                app: "３目並べ",
                mss: `"${current.squares[a]}" が勝ちました`,
              },
            })
          );
        }
        return current.squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner();
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    if (current.squares.includes("")) {
      status = "Next player: " + current.xnext;
    } else {
      if (user.uid) {
        dispatch(
          logAdd({
            loguser: { providerId: user.providerId, uid: user.uid },
            log: {
              tms: null,
              dmn: user.domain,
              lvl: "Info",
              app: "３目並べ",
              mss: `引き分けでした`,
            },
          })
        );
      }
      status = "Drow!";
    }
  }

  const moves = history.history.map((step, move) => {
    const desc = move
      ? "Go to move #" + move + "(" + zahyo.xy[history.addnum[move]] + ")"
      : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => dispatch(mod(move))}>{desc}</button>
      </li>
    );
  });

  return (
    <div className={styles.game}>
      <Container component="main" maxWidth="sm">
        <Box mt={1}>
          <div className={styles.gameinfo}>
            <div>{status}</div>
          </div>
        </Box>

        <Box mt={3}>
          <div className={styles.gameinfo}>
            <Board />
          </div>
        </Box>

        <Box mt={3}>
          <div className={styles.gameinfo}>
            <ol>{moves}</ol>
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default Game;
