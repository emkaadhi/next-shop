import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyATZ5utieCnLCA_zpey11TJEO1nV3zpC-4",
    authDomain: "lat-pedia.firebaseapp.com",
    databaseURL: "https://lat-pedia-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "lat-pedia",
    storageBucket: "lat-pedia.appspot.com",
    messagingSenderId: "355540831011",
    appId: "1:355540831011:web:40b96804c644aef15fda96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app