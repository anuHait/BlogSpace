// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyDaVotRiSgRqpOnvXPWnh1rkoz99gLg4Kc",
  authDomain: "blog-auth-9aa90.firebaseapp.com",
  projectId: "blog-auth-9aa90",
  storageBucket: "blog-auth-9aa90.appspot.com",
  messagingSenderId: "587197197475",
  appId: "1:587197197475:web:1c14e67bb3f991d9346316"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider=new GoogleAuthProvider(auth);
//const storage = getStorage(app);
export  {auth,provider};