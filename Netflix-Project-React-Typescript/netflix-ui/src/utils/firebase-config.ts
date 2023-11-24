
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA-bZAaHKYqSZOYsiYgxMWdPEoljU4QFCs",
  authDomain: "react-typescript-netflix-b0ecd.firebaseapp.com",
  projectId: "react-typescript-netflix-b0ecd",
  storageBucket: "react-typescript-netflix-b0ecd.appspot.com",
  messagingSenderId: "791408247172",
  appId: "1:791408247172:web:1bab0c6e9283026c771dd1",
  measurementId: "G-TVM9P7ZX9L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app)

