import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAptGHtuSGvWXJcB6bEhIMk9BKlPJ71DSE',
  authDomain: 'tripradar-6f8cb.firebaseapp.com',
  projectId: 'tripradar-6f8cb',
  storageBucket: 'tripradar-6f8cb.firebasestorage.app',
  messagingSenderId: '727316308622',
  appId: '1:727316308622:web:32dca7b3db46bff8d39fdf',
  measurementId: 'G-CPWY2599H5',
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Инициализация Auth
export const auth = getAuth(app);
export default app;
