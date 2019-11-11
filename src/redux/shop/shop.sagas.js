import { takeLatest, call, put } from 'redux-saga/effects';

import { ShopActionTypes } from './shop.types';
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from './shop.actions';
import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebas.utils';

export function* fetchCollectionsAsync() {
  yield console.log('i am fired');

  try {
    const collectionRef = firestore.collection('collections');
    const collectionsSnapShot = yield collectionRef.get();
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      collectionsSnapShot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
  // .catch(error => dispatch(fetchCollectionsFailure(error.message)));
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
