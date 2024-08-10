import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVXLGzWtiew2kgCSy7e3PYb6nbP-y7I-U",
  authDomain: "reactblog-d7ccc.firebaseapp.com",
  projectId: "reactblog-d7ccc",
  storageBucket: "reactblog-d7ccc.appspot.com",
  messagingSenderId: "501510072625",
  appId: "1:501510072625:web:96f9b8e3263576d1c56810",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db};