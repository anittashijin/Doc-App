import { initializeApp } from "firebase/app";
import    {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyB5A-2ZAGr68U6ExQqfjnRgLFdG7VSsth4",
    authDomain: "docs-app-ec180.firebaseapp.com",
    projectId: "docs-app-ec180",
    storageBucket: "docs-app-ec180.appspot.com",
    messagingSenderId: "565594894501",
    appId: "1:565594894501:web:e8a97456e7e7d2fce71d4c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore=getFirestore(app);
