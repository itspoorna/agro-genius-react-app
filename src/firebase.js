// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Image Upload library


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsOh5haGtGm5i9OhgWolyeo2WMCAbIxmI",
  authDomain: "agro-genius-7084a.firebaseapp.com",
  projectId: "agro-genius-7084a",
  storageBucket: "agro-genius-7084a.appspot.com",
  messagingSenderId: "393400760213",
  appId: "1:393400760213:web:fc27eadd00e35eafc8689c",
  measurementId: "G-GBQ786R6SL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);
