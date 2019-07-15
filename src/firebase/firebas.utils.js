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

export const creatUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const userSnapshot = await userRef.get();
  if (!userSnapshot.exists) {
    const { displayName, email } = userAuth;
    const creatAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        creatAt,
        ...additionalData
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  // console.log(collectionRef);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collectionsSnapShot => {
  const collectionArray = collectionsSnapShot.docs.map(collectionSnapShot => {
    const { title, items } = collectionSnapShot.data();
    return {
      id: collectionSnapShot.id,
      title,
      items,
      routeName: encodeURI(title.toLowerCase())
    };
  });
  // console.log(collectionArray);
  return collectionArray.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export default firebase;
