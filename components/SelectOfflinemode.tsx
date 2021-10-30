import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, updateUserProfile } from "../features/auth/authSlice";

import { db } from "../firebase";
import { enableIndexedDbPersistence } from "firebase/firestore";

import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const SelectOfflinemode: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const swichOfflinemode = () => {
    if (user.offline === false) {
      enableIndexedDbPersistence(db);
      dispatch(
        updateUserProfile({
          providerId: user.providerId,
          uid: user.uid,
          photoUrl: user.photoUrl,
          providerDisplayName: user.providerDisplayName,
          displayName: user.displayName,
          domain: user.domain,
          rool: user.rool,
          offline: true,
        })
      );
    }
  };

  return (
    <>
      {user.uid ? (
        <Container component="main" maxWidth="xs">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>オンラインモード: 無効</Typography>
            <AntSwitch
              inputProps={{ "aria-label": "ant design" }}
              onChange={swichOfflinemode}
            />
            <Typography>有効</Typography>
          </Stack>
        </Container>
      ) : (
        <Container component="main" maxWidth="xs">
          オフラインモードを体験するには「認証」でログインしてください
        </Container>
      )}
    </>
  );
};

export default SelectOfflinemode;
