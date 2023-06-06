import { initializeApp } from 'firebase/app';
import { collection, getFirestore, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig);
const appFireStore = getFirestore(app);
const appAuth = getAuth();
const timeStamp = Timestamp;

// 파이어베이스 컬렉션 Ref.
// 유저 Ref.
const userCollectionRef = collection(appFireStore, 'user');
// 스토어 Ref.
const storeCollectionRef = collection(appFireStore, 'store');

export { appFireStore, appAuth, timeStamp, userCollectionRef, storeCollectionRef }
