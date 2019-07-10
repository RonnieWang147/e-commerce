import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDJQpmtdN8aCKF4pEk6DoO4kmUqN8MpN5k',
  authDomain: 'mhydemoapplication.firebaseapp.com',
  databaseURL: 'https://mhydemoapplication.firebaseio.com',
  projectId: 'mhydemoapplication',
  storageBucket: '',
  messagingSenderId: '386626033577',
  appId: '1:386626033577:web:c6dfda69e134b2be'
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
