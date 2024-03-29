import { initializeApp } from 'firebase/app';
import { collection, getFirestore, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref } from 'firebase/storage';

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
const appStorage = getStorage();
const timeStamp = Timestamp;

// 파이어스토어 컬렉션 Ref.
// 유저 Ref.
const userCollectionRef = collection(appFireStore, 'user');
// 스토어 Ref.
const storeCollectionRef = collection(appFireStore, 'storeProducts');
// 구매기록 Ref.
const purchaseRecordCollectionRef = collection(appFireStore, 'purchaseRecord');
// 포인트 사용기록 Ref.
const pointRecordCollectionRef = collection(appFireStore, 'pointRecord');
// 장바구니 DB Ref.
const shoppingBasketCollectionRef = collection(appFireStore, 'shoppingBasket');
// 리뷰와 QnA DB Ref.
const reviewCollectionRef = collection(appFireStore, 'reviewRecord');

// 파이어베이스 스토리지 Ref.
const storageRef = ref(appStorage);

export { appFireStore, appAuth, timeStamp, userCollectionRef, storeCollectionRef, purchaseRecordCollectionRef, pointRecordCollectionRef, storageRef, shoppingBasketCollectionRef, reviewCollectionRef }
