import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBb0gccAWocgyHl0ifFbz9AnzeEGXhATXo',
  authDomain: 'react-zzaria-7d8d5.firebaseapp.com',
  databaseURL: 'https://react-zzaria-7d8d5.firebaseio.com',
  projectId: 'react-zzaria-7d8d5',
  storageBucket: 'react-zzaria-7d8d5.appspot.com',
  messagingSenderId: '554976170245',
  appId: '1:554976170245:web:5883784a98ff75938a276c'
};

firebase.initializeApp(firebaseConfig);

export default firebase;
