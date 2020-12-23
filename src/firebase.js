import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyDFpFjjEXPDPn9xPaFl4nsV7gH1X5ZvALU",
  authDomain: "task-2f9f8.firebaseapp.com",
  projectId: "task-2f9f8",
  storageBucket: "task-2f9f8.appspot.com",
  messagingSenderId: "1050232886133",
  appId: "1:1050232886133:web:fa11739ada2aba6f58b93c",
  measurementId: "G-C91DY0ZKJS"
};


firebase.initializeApp(firebaseConfig);
const db= firebase.firestore();

export {firebase,db};
