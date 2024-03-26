import { initializeApp } from "firebase/app";
import { getAnalytics} from "firebase/analytics";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCtqYYDXSSG1PIDe4txZdsoGiRv1gwzkf8",
  authDomain: "loki-netflix.firebaseapp.com",
  projectId: "loki-netflix",
  storageBucket: "loki-netflix.appspot.com",
  messagingSenderId: "539645913176",
  appId: "1:539645913176:web:1cf55784a015c03776022d",
  measurementId: "G-TY4NXHL6Z8"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();