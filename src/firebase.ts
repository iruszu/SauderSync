// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCIfg9exFEXk6-jM6B8v0Wn872Z7ajAsn8',
  authDomain: 'sauderhub.firebaseapp.com',
  projectId: 'sauderhub',
  storageBucket: 'sauderhub.firebasestorage.app',
  messagingSenderId: '834929183640',
  appId: '1:834929183640:web:e05b0b6cb2c18834d379ed',
  measurementId: 'G-93X6QB4TEJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
