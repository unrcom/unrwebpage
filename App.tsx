import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  login,
  logout,
  updateUserProfile,
} from "./features/auth/authSlice";
import { logAdd } from "./features/log/logSlice";

import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import DumyMain from "./components/DumyMain";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("App.tsx 1st useEffect");
    const unSub = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        if (user.uid.length === 0) {
          dispatch(
            logAdd({
              loguser: { providerId: authUser.providerId, uid: authUser.uid },
              log: {
                tms: null,
                dmn: "?",
                lvl: "Info",
                app: "Auth",
                mss: "認証通過",
              },
            })
          );
        }
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
        if (user.uid.length > 0) {
          dispatch(
            logAdd({
              loguser: { providerId: user.providerId, uid: user.uid },
              log: {
                tms: null,
                dmn: user.domain,
                lvl: "Info",
                app: "Auth",
                mss: "Logout",
              },
            })
          );
          dispatch(logout());
        }
      }
    });
    return () => {
      unSub();
    };
  }, [
    dispatch,
    user.displayName,
    user.domain,
    user.rool,
    user.providerId,
    user.uid,
  ]);

  useEffect(() => {
    console.log("App.tsx 2nd useEffect");
    const fetchUser = async () => {
      const id = user.providerId + "_" + user.uid;
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        dispatch(
          updateUserProfile({
            providerId: user.providerId,
            uid: user.uid,
            photoUrl: user.photoUrl,
            providerDisplayName: user.providerDisplayName,
            displayName: docSnap.data().displayName,
            domain: docSnap.data().domain,
            rool: docSnap.data().rool,
          })
        );
      }
    };
    if (user.uid) {
      fetchUser();
    }
  }, [
    user.providerId,
    user.uid,
    user.photoUrl,
    user.providerDisplayName,
    dispatch,
  ]);

  return (
    <div className="App">
      <DumyMain />
    </div>
  );
}

export default App;
