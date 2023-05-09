// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1VnrMsMcND-KlEfuDrWiHy2EOUz65ERk",
  authDomain: "devapp-meau-9d6f5.firebaseapp.com",
  projectId: "devapp-meau-9d6f5",
  storageBucket: "devapp-meau-9d6f5.appspot.com",
  messagingSenderId: "660076971766",
  appId: "1:660076971766:web:44c901da2650f9cd7a4ed7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default {
  app,
};

export const db = getFirestore(app);
