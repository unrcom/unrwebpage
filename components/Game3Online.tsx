import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import {
  selectTaisenRireki,
  mod,
  addAikotoba,
} from "../features/sanmokuOnline/sanmokuOnlineSlice";
import { logAdd } from "../features/log/logSlice";
import Board3Online from "./Board3Online";
import Post from "./Post";
import styles from "./Game.module.css";

import { makeStyles } from "@material-ui/core";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import dayjs from "dayjs";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Game3Online: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState("");
  const [tweetMsg, setTweetMsg] = React.useState("");
  const [posts, setPosts] = React.useState([
    {
      displayName: "",
      avatar: "",
      text: "",
      tmstmp: "",
    },
  ]);
  const [btnComment, setBtnComment] = React.useState("合言葉を指定する");
  const [status, setStatus] = React.useState("");

  const classes = useStyles();
  const user = useSelector(selectUser);
  const taisenRireki = useSelector(selectTaisenRireki);
  // const userTaisenRireki = useSelector(selectUserTaisenRireki);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    console.log("Game3Online.tsx useEffect 1st");
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
          taisenRireki.squares[a] !== "" &&
          taisenRireki.squares[a] === taisenRireki.squares[b] &&
          taisenRireki.squares[a] === taisenRireki.squares[c]
        ) {
          if (user.uid) {
            dispatch(
              logAdd({
                loguser: { providerId: user.providerId, uid: user.uid },
                log: {
                  tms: null,
                  lvl: "Info",
                  app: "３目並べオンライン",
                  mss: `"${taisenRireki.squares[a]}" が勝ちました`,
                },
              })
            );
          }
          return taisenRireki.squares[a];
        }
      }
      return null;
    };

    const winner = calculateWinner();
    if (winner) {
      setStatus("Winner: " + winner);
    } else {
      if (taisenRireki.squares.includes("")) {
        setStatus("Next player: " + taisenRireki.xnext);
      } else {
        if (user.uid) {
          dispatch(
            logAdd({
              loguser: { providerId: user.providerId, uid: user.uid },
              log: {
                tms: null,
                lvl: "Info",
                app: "３目並べオンライン",
                mss: `引き分けでした`,
              },
            })
          );
        }
        setStatus("Drow!");
      }
    }
  }, [
    taisenRireki.squares,
    dispatch,
    taisenRireki.xnext,
    user.providerId,
    user.uid,
  ]);

  const moves = taisenRireki.history.map((step, move) => {
    const desc = move
      ? "Go to move #" +
        move +
        "(" +
        taisenRireki.zahyo[taisenRireki.addnum[move]] +
        ")"
      : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => dispatch(mod(move))}>{desc}</button>
      </li>
    );
  });

  // const createAikotoba = () => {
  //   setModalTitle("新規の合言葉を設定");
  //   handleOpen();
  // };

  const callAikotoba = () => {
    if (taisenRireki.aikotoba === "") {
      setModalTitle("合言葉は？");
      handleOpen();
    } else {
      dispatch(addAikotoba(""));
    }
  };

  const addComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newComments: {
      displayName: string;
      avatar: string;
      text: string;
      tmstmp: string;
    }[] = [{ displayName: "", avatar: "", text: "", tmstmp: "" }];
    for (const post of posts) {
      if (post.text !== "") {
        newComments.push({
          displayName: post.displayName,
          avatar: post.avatar,
          text: post.text,
          tmstmp: post.tmstmp,
        });
      }
    }
    newComments.unshift({
      displayName: user.displayName,
      avatar: user.photoUrl,
      text: tweetMsg,
      tmstmp: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    });
    setPosts(newComments);
  };

  React.useEffect(() => {
    console.log("Game3Online.tsx useEffect 2nd");
    if (taisenRireki.aikotoba === "") {
      setBtnComment("合言葉を指定する");
    } else {
      setBtnComment("対戦を終了する");
    }
  }, [taisenRireki.aikotoba]);

  return (
    <>
      {/* {user.uid ? ( */}
      <div className={styles.game}>
        <Container component="main" maxWidth="sm">
          <Box mt={1}>
            <h4>開発予定のモック画面です。雰囲気だけですがご確認ください</h4>
          </Box>
          <Box mt={6}>
            <h3>
              {taisenRireki.aikotoba === ""
                ? "[合言葉を指定する] で合言葉を指定してください"
                : "合言葉は「" + taisenRireki.aikotoba + "」"}
            </h3>
          </Box>
          <Box mt={1}>
            <h5>
              {taisenRireki.aikotoba === ""
                ? "同じ合言葉を指定したユーザ同士で対戦できるようになります"
                : "対戦をお楽しみください"}
            </h5>
          </Box>
          <Box mt={4}>
            <div className={styles.gameinfo}>
              <div>{status}</div>
            </div>
          </Box>
          <Box mt={3}>
            <div className={styles.gameinfo}>
              <Board3Online />
            </div>
          </Box>
          <Box mt={3}>
            <div className={styles.gameinfo}>
              <div>{moves}</div>
            </div>
          </Box>
          {/* <Box mt={3}>
              <div className={styles.gameinfo}>
                <form className={classes.form} noValidate>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    size="large"
                    onClick={() => createAikotoba()}
                  >
                    新規の合言葉を設定する
                  </Button>
                </form>
              </div>
            </Box> */}
          <Box mt={3}>
            <div className={styles.gameinfo}>
              <form className={classes.form} noValidate>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  size="large"
                  onClick={() => callAikotoba()}
                >
                  {btnComment}
                </Button>
              </form>
            </div>
          </Box>
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
                  label={modalTitle}
                  type="text"
                  value={taisenRireki.aikotoba}
                  onChange={(e) => dispatch(addAikotoba(e.target.value))}
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
                    dispatch(addAikotoba(taisenRireki.aikotoba));
                    handleClose();
                  }}
                >
                  対戦開始
                </Button>
              </Box>
            </Box>
          </Modal>

          <form onSubmit={addComment}>
            <div className={styles.tweet_form}>
              <input
                className={styles.tweet_input}
                placeholder="What's happening?"
                type="text"
                autoFocus
                value={tweetMsg}
                onChange={(e) => setTweetMsg(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              disabled={!tweetMsg}
              className={
                tweetMsg ? styles.tweet_sendBtn : styles.tweet_sendDisableBtn
              }
            >
              Tweet
            </Button>
          </form>
          {posts.map((post, move) => (
            <Post
              key={move}
              avatar={post.avatar}
              text={post.text}
              timestamp={post.tmstmp}
            />
          ))}
        </Container>
      </div>
      {/* ) : (
        <div className={styles.game}>
          <Container component="main" maxWidth="sm">
            <Box mt={1}>
              <h2>オンライン対戦は 認証 でログインして使用してください</h2>
            </Box>
          </Container>
        </div>
      )} */}
    </>
  );
};

export default Game3Online;
