// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyArL8yX4pzMv0ZYvYL1n5IdO0p8Ip5qUrA",
    authDomain: "chat-app-ver0.firebaseapp.com",
    projectId: "chat-app-ver0",
    storageBucket: "chat-app-ver0.appspot.com",
    messagingSenderId: "1033896632743",
    appId: "1:1033896632743:web:6c72f946139d8fe13a5682",
    measurementId: "G-1V1JC965S0"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const database = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default database;
