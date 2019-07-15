import { ShopActionTypes } from './shop.types';
import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebas.utils';

export const fetchCollectionsStart = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});

export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    dispatch(fetchCollectionsStart());
    const collectionRef = firestore.collection('collections');

    collectionRef
      .get()
      .then(collectionsSnapShot => {
        const collectionsMap = convertCollectionsSnapshotToMap(
          collectionsSnapShot
        );
        dispatch(fetchCollectionsSuccess(collectionsMap));
      })
      .catch(error => dispatch(fetchCollectionsFailure(error.message)));
  };
};
