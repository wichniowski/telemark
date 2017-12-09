import firebase from "firebase";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "telemark-b8ce9.firebaseapp.com",
  databaseURL: "https://telemark-b8ce9.firebaseio.com",
  projectId: "telemark-b8ce9",
  storageBucket: "telemark-b8ce9.appspot.com",
  messagingSenderId: "373701218475"
};

firebase.initializeApp(config);
export default firebase;
