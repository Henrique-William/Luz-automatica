import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBHhiwCBjUoZvi8w0q1BGEh68hAk2E6gok",
  authDomain: "luz-automatica-6715c.firebaseapp.com",
  databaseURL: "https://luz-automatica-6715c-default-rtdb.firebaseio.com",
  projectId: "luz-automatica-6715c",
  storageBucket: "luz-automatica-6715c.appspot.com",
  messagingSenderId: "89694329459",
  appId: "1:89694329459:web:48c91147cb93f6ddd56806"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// Autenticação anônima
signInAnonymously(auth)
  .then(() => {
    console.log('Signed in anonymously');
  })
  .catch((error) => {
    console.error('Error signing in anonymously:', error);
  });

export { db };
