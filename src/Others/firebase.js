// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp39HmeH6PyNdGPJiS8I6RHgawa-TQ_zY",
  authDomain: "react-tutorial-32a15.firebaseapp.com",
  projectId: "react-tutorial-32a15",
  storageBucket: "react-tutorial-32a15.appspot.com",
  messagingSenderId: "607625665481",
  appId: "1:607625665481:web:23b9a5d12382ff03aba618",
  measurementId: "G-RM4BZ5EB9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebaseConfig;