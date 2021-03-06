import firebase from "firebase/app";

import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAS5itHQdh7OCZ8mqqkyNv3dBmYCrv_uDk",
  authDomain: "set-up-bcd2d.firebaseapp.com",
  projectId: "set-up-bcd2d",
  storageBucket: "set-up-bcd2d.appspot.com",
  messagingSenderId: "1059814039032",
  appId: "1:1059814039032:web:7f9cefd61f36a49cb98a0d"
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

export default db;
