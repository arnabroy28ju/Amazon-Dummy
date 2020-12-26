import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCoovHJY7-KJz86wuPueR-6qk3oYITwB2c",
  authDomain: "clone-f2416.firebaseapp.com",
  databaseURL: "https://clone-f2416.firebaseio.com",
  projectId: "clone-f2416",
  storageBucket: "clone-f2416.appspot.com",
  messagingSenderId: "522066077570",
  appId: "1:522066077570:web:2f9d6bbd55ae6e2ad5519b",
  measurementId: "G-PNS9G09J16"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};