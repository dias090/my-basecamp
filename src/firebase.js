import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAioE71a-ghPQXUC5jk4C-VStzMISCRElc",
  authDomain: "my-basecamp-9b27a.firebaseapp.com",
  projectId: "my-basecamp-9b27a",
  storageBucket: "my-basecamp-9b27a.appspot.com",
  messagingSenderId: "713291578510",
  appId: "1:713291578510:web:06d016ed990b9ed8eedddf"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {app, auth, db}; 