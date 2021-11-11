import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, updateUserProfile } from "../features/auth/authSlice";
import { logAdd } from "../features/log/logSlice";

import { auth, provider, db } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

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

  const updateDisplayname = async () => {
    const id = user.providerId + "_" + user.uid;
    const docRef = doc(db, "users", id);
    await updateDoc(docRef, {
      displayName: newDisplayName,
    });
    console.log('Auth.tsx updateDoc("users.displayName")');
    const oldDisplayName = user.displayName;
    dispatch(
      updateUserProfile({
        providerId: user.providerId,
        uid: user.uid,
        photoUrl: user.photoUrl,
        providerDisplayName: user.providerDisplayName,
        displayName: newDisplayName,
        domain: user.domain,
        rool: user.rool,
      })
    );
    dispatch(
      logAdd({
        loguser: { providerId: user.providerId, uid: user.uid },
        log: {
          tms: null,
          dmn: user.domain,
          lvl: "Info",
          app: "Auth",
          mss: `Displayname: "${oldDisplayName}" => "${newDisplayName}"`,
        },
      })
    );
  };

  const updateDomain = async () => {
    const id = user.providerId + "_" + user.uid;
    const docRef = doc(db, "users", id);
    await updateDoc(docRef, {
      domain: newDomain,
    });
    console.log('Auth.tsx updateDoc("users.domain")');
    const oldDomain = user.domain;
    dispatch(
      updateUserProfile({
        providerId: user.providerId,
        uid: user.uid,
        photoUrl: user.photoUrl,
        providerDisplayName: user.providerDisplayName,
        displayName: user.displayName,
        domain: newDomain,
        rool: user.rool,
      })
    );
    dispatch(
      logAdd({
        loguser: { providerId: user.providerId, uid: user.uid },
        log: {
          tms: null,
          dmn: user.domain,
          lvl: "Info",
          app: "Auth",
          mss: `Domain: "${oldDomain}" => "${newDomain}"`,
        },
      })
    );
  };

  const displayNameIsDisabled = newDisplayName.length === 0;
  const domainIsDisabled = newDomain.length === 0;

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
              disabled={displayNameIsDisabled}
              // onClick={editDiaplayName}
              onClick={updateDisplayname}
            >
              Display name を変更
            </Button>
            <Box mt={6}>
              ドメインは指定しなくても本サイトのデモを体験いただけます。
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
              value={newDomain}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNewDomain(e.target.value);
              }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={domainIsDisabled}
              // onClick={editDomain}
              onClick={updateDomain}
            >
              Domain を変更
            </Button>
            <Box mt={6}>
              本番サイトでは、
              ドメインにあなたが所属する組織の管理者が指定するフレーズを登録します。
              通常はドメイン (example.com など)
              が指定されますが、不明な場合は管理者に確認してください。
              ドメインを指定することにより、勤務表の提出や各種の申請、
              設備予約状況の確認や予約の設定などが利用できるようになります。
              また管理者は、ドメインに所属するユーザの勤務表や各種申請に対する
              査閲や承認を行うことが可能になります。
            </Box>
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
