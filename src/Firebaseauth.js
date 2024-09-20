// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:"AIzaSyCsbWMLGCfVS0g6F2HMQTQrq1lKO_XTxSI",
  authDomain: "careernet-8baba.firebaseapp.com",
  projectId: "careernet-8baba",
  storageBucket: "careernet-8baba.appspot.com",
  messagingSenderId: "392064431851",
  appId: "1:392064431851:web:a873f6f6fdcec2896b30ae",
  measurementId: "G-81J4JH6M6M"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
