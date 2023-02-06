// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/app"  ;
import "firebase/compat/firestore"
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDiZE747uS2t9AGiCRBlkwFeW9SHda_HUE",
  authDomain: "kltn-5be2b.firebaseapp.com",
  projectId: "kltn-5be2b",
  storageBucket: "kltn-5be2b.appspot.com",
  messagingSenderId: "910099169111",
  appId: "1:910099169111:web:3c5abbaf48d4faacf0c812",
  measurementId: "G-ECRK2WNTHH"
};

// Initialize Firebase
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

