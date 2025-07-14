import { FirebaseApp, initializeApp } from 'firebase/app';
import { getConfig } from '@runtime/index'; // Your config loader
import { getDatabaseInstance } from './firestoreDb';

let firebaseApp: FirebaseApp = null as unknown as FirebaseApp;

const initializeFirebase = (): void => {
  console.log('initializeFirebase called');
  try {
    const config = getConfig();
    console.log('hello config', config);
    if (!config?.firebase) {
      console.error('❌ Firebase config is missing.', { config });
      throw new Error('Firebase config is missing.');
    }
    firebaseApp = initializeApp({
      apiKey: 'AIzaSyCIfg9exFEXk6-jM6B8v0Wn872Z7ajAsn8',
      authDomain: 'sauderhub.firebaseapp.com',
      projectId: 'sauderhub',
      storageBucket: 'sauderhub.firebasestorage.app',
      messagingSenderId: '834929183640',
      appId: '1:834929183640:web:e05b0b6cb2c18834d379ed',
      measurementId: 'G-93X6QB4TEJ',
    }); //
    console.log('✅ Firebase initialized successfully:', firebaseApp.name);
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
  }
};

initializeFirebase();
if (firebaseApp) getDatabaseInstance(firebaseApp);

export default firebaseApp;
