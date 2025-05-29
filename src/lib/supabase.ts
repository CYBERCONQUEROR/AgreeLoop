import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBcikJWZxU1-wbgsZEO4o-mpfrNUwDItIQ",
  authDomain: "agree-e6c87.firebaseapp.com",
  projectId: "agree-e6c87",
  storageBucket: "agree-e6c87.appspot.com", // Or "agree-e6c87.firebasestorage.app" if that's what you configured
  messagingSenderId: "662772457918",
  appId: "1:662772457918:web:85da407a56f662207cd9ef",
  measurementId: "G-DHFJMQTQTD"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Ensure all necessary Firebase services and the firebase namespace (as firebaseApp) are exported.
export { auth, db, storage, googleProvider, firebase as firebaseApp };