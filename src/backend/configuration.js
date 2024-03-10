
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig={
  apiKey: "AIzaSyC7R69LG4-Flq_cV8XBkAbcrwrU7t7QM1U",
  authDomain: "fridayz-a34e2.firebaseapp.com",
  projectId: "fridayz-a34e2",
  storageBucket: "fridayz-a34e2.appspot.com",
  messagingSenderId: "461127425327",
  appId: "1:461127425327:web:4798f78871b22f18a615da",
  measurementId: "G-ZE434C5Z8K",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


//const analytics = getAnalytics(app);
const db = getFirestore(app);
export default db;
