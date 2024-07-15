import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBLItatxs1rqLIDvEDH8xqfEsK6YUpPFNk",
  authDomain: "goodfoodie-54cb1.firebaseapp.com",
  projectId: "goodfoodie-54cb1",
  storageBucket: "goodfoodie-54cb1.appspot.com",
  messagingSenderId: "302900940055",
  appId: "1:302900940055:web:a53721f587e8ef1d1f3b52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);