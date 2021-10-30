import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  login,
  logout,
  updateUserProfile,
} from "./features/auth/authSlice";
import {
  selectLogRecordCountMax,
  logUnshift,
  logAdd,
  logClear,
} from "./features/log/logSlice";

import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  getDocs,
  //  onSnapshot,
  orderBy,
  where,
  limit,
} from "firebase/firestore";

import DumyMain from "./components/DumyMain";

function App() {
  const user = useSelector(selectUser);
  const logRecordCountMax = useSelector(selectLogRecordCountMax);
  const dispatch = useDispatch();

  // const stateClear = () => {
  //   dispatch(logout());
  //   //dispatch(();
  //   dispatch(logClear());
  // };

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        if (user.uid.length === 0) {
          dispatch(
            logUnshift({
              created_at: Date.now(),
              providerId: authUser.providerId,
              uid: authUser.uid,
              domain: "?",
              level: "Info",
              app: "Auth",
              message: "Login",
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
        dispatch(logout());
        dispatch(logClear());
        // stateClear();
      }
    });
    return () => {
      unSub();
    };
  }, [dispatch, user.displayName, user.domain, user.rool, user.uid]);

  useEffect(() => {
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
    const fetchLogs = async () => {
      const q = query(
        collection(db, "logs"),
        where("providerId", "==", user.providerId),
        where("uid", "==", user.uid),
        orderBy("created_at", "desc"),
        limit(logRecordCountMax.value)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // const unSub = onSnapshot(q, (snapshot) => {
        //   snapshot.docs.map((doc) =>
        dispatch(
          logAdd({
            created_at: doc.data().created_at,
            providerId: doc.data().providerId,
            uid: doc.data().uid,
            domain: doc.data().domain,
            level: doc.data().level,
            app: doc.data().app,
            message: doc.data().message,
          })
        );
      });
      // return () => {
      //   unSub();
      // };
    };
    if (user.uid) {
      fetchUser();
      fetchLogs();
    }
  }, [
    user.providerId,
    user.uid,
    user.photoUrl,
    user.providerDisplayName,
    logRecordCountMax.value,
    dispatch,
  ]);

  return (
    <div className="App">
      <DumyMain />
    </div>
  );
}

export default App;
