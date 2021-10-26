import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  login,
  logout,
  updateUserProfile,
} from "../features/auth/authSlice";

import { auth, provider, db } from "../firebase";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { makeStyles } from "@material-ui/core";

import CameraIcon from "@material-ui/icons/Camera";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";

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

const Auth: React.FC = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [newDisplayName, setNewDisplayName] = useState("");
  const [newDomain, setNewDomain] = useState("");

  const signInGoogle = async () => {
    await signInWithPopup(auth, provider).catch((err) => alert(err.message));
  };

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            providerId: authUser.providerId,
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: user.displayName,
            providerDisplayName: authUser.displayName,
            domain: user.domain,
            rool: user.rool,
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch]);

  const fetchUsers = async () => {
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("providerId", "==", user.providerId),
      where("uid", "==", user.uid)
    );
    //Review later
    const docSnap = await getDocs(q);
    docSnap.forEach((doc) => {
      dispatch(
        updateUserProfile({
          providerId: user.providerId,
          uid: user.uid,
          photoUrl: user.photoUrl,
          providerDisplayName: user.providerDisplayName,
          displayName: doc.data().displayName,
          domain: doc.data().domain,
          rool: doc.data().rool,
        })
      );
    });
  };

  useEffect(() => {
    fetchUsers();
  }, [user.providerId, user.uid, dispatch]);

  const editDiaplayName = () => {
    return null;
  };

  const editDomain = () => {
    return null;
  };

  return (
    <>
      {user.uid ? (
        <Container component="main" maxWidth="xs">
          <Box mt={6}>Googleアカウントでログイン中です。</Box>
          <CssBaseline />
          <div className={classes.paper}>
            <form className={classes.form} noValidate>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<LockOpenOutlinedIcon />}
                className={classes.submit}
                size="large"
                onClick={() => auth.signOut()}
              >
                ログアウトはこちら
              </Button>
            </form>
          </div>
          <Box mt={6}>
            画面右上に表示されている Display name (ユーザ名)
            は指定の名前に変更できます。
          </Box>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              //required
              fullWidth
              id="displayname"
              label="Display name"
              name="displayname"
              autoComplete="displayname"
              autoFocus
              value={newDisplayName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNewDisplayName(e.target.value);
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={editDiaplayName}
            >
              Display name を変更
            </Button>
            <Box mt={6}>
              ドメインにはあなたが所属する組織の管理者が指定するフレーズを登録します。
              通常はドメイン (example.com など)
              が指定されますが、不明な場合は管理者に確認してください。
              ドメインを指定しない場合は管理者と連携する機能を利用することができません。
            </Box>
            <Box mt={6}>
              現在のドメイン: {user.domain ? user.domain : "(現在指定なし)"}
            </Box>

            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="domain"
              label="Domain"
              name="domain"
              autoComplete="domain"
              autoFocus
              value={newDisplayName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNewDomain(e.target.value);
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={editDiaplayName}
            >
              Domain を変更
            </Button>
          </form>
        </Container>
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              ログイン
            </Typography>
            <form className={classes.form} noValidate>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<CameraIcon />}
                className={classes.submit}
                size="large"
                onClick={signInGoogle}
              >
                Google アカウントでログイン
              </Button>
            </form>
          </div>
          <Box mt={6}>
            ご自分のパソコンでない場合は Google Chrome
            のゲストモードやシークレットウィンドウを利用して、ユーザ情報をブラウザに残さないようにしましょう。
          </Box>
          <Box mt={6}>
            本デモサイトを利用される場合には、お試し用の Googleアカウント
            をご用意いただくのもおすすめです。
          </Box>
        </Container>
      )}
    </>
  );
};

export default Auth;
