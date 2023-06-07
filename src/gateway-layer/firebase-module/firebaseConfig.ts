import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD1VnrMsMcND-KlEfuDrWiHy2EOUz65ERk",
  authDomain: "devapp-meau-9d6f5.firebaseapp.com",
  projectId: "devapp-meau-9d6f5",
  storageBucket: "devapp-meau-9d6f5.appspot.com",
  messagingSenderId: "660076971766",
  appId: "1:660076971766:web:44c901da2650f9cd7a4ed7",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebase);
export const firebaseDb = getFirestore(firebase);
export const firebaseStorage = getStorage(firebase);
