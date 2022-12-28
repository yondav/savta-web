import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import 'firebase/compat/storage';

const FIREBASE_CONFIG = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
};

const app = firebase.initializeApp(FIREBASE_CONFIG);

const auth = getAuth(app);
const db = getFirestore();
const storage = firebase.storage();

export { auth, db, storage };
