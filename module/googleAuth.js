// Firebase Authentication
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { createFirestoreData, updateFirestoreData } from "../module/CRUD.js";
import { checkUserStatus } from "../javascript/userStatus.js";

import { app } from "../config/firebaseConfig.js";

// Auth
const auth = getAuth(app);
const providerGoogle = new GoogleAuthProvider();

export function googleSignInFunc() {
  signInWithPopup(auth, providerGoogle)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      const TIMESTAMP = new Date().getTime();
      /**
       * After Sign in we can get infomation from firebase
       * 1. Google provider credential
       * 2. token
       * 3. user info, google name, google profile picture.
       * i save all info to local storage.
       */
      localStorage.setItem("googleCredential", JSON.stringify(credential));
      localStorage.setItem("googleToken", token);
      localStorage.setItem("googleUser", JSON.stringify(user));

      createFirestoreData("Kanban-Auth", `${user.uid}-${TIMESTAMP}`, {
        credential: JSON.stringify(credential),
        TIMESTAMP,
        token,
        user: JSON.stringify(user),
      });

      checkUserStatus();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
}

export function googleSignOutFunc() {
  console.log("googleSignOutFunc");
  signOut(auth)
    .then(() => {
      // removeItem
      localStorage.removeItem("googleCredential");
      localStorage.removeItem("googleToken");
      localStorage.removeItem("googleUser");
      window.location.href = "./index.html";
    })
    .catch((error) => {
      // An error happened.
    });
}
