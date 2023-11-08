import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import 'firebase/storage';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAewUafh9Zc8zRskL8XqEU6BiZ7Jt0ekF0",
  authDomain: "plataforma-tcc.firebaseapp.com",
  projectId: "plataforma-tcc",
  storageBucket: "plataforma-tcc.appspot.com",
  messagingSenderId: "596401691762",
  appId: "1:596401691762:web:3d3c070ac1806ba80f36eb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, sendPasswordResetEmail, signInWithEmailAndPassword, db };