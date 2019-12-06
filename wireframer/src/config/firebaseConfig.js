import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyBcA8HkDyfxfg9_13fPa-qWW5lTDnLnGLQ",
    authDomain: "wireframer-41732.firebaseapp.com",
    databaseURL: "https://wireframer-41732.firebaseio.com",
    projectId: "wireframer-41732",
    storageBucket: "wireframer-41732.appspot.com",
    messagingSenderId: "105065243096",
    appId: "1:105065243096:web:df1296bef069f9b04192ad",
    measurementId: "G-LQXQ86V256"
  };
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;