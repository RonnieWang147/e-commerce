import { takeLatest, all, call, put } from 'redux-saga/effects';

import userActionTypes from './user.types';
import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
} from './user.actions';
import { clearCart } from '../cart/cart.actions';
import {
  auth,
  signInWithGoogle,
  createUserProfileDocument,
  getCurrentUser,
} from '../../firebase/firebas.utils';

function* getSnapShotFromUserAuth(user) {
  try {
    const userRef = yield call(createUserProfileDocument, user);
    const userSnapshot = yield userRef.get();
    yield put(
      signInSuccess({
        id: userSnapshot.id,
        ...userSnapshot.data(),
      })
    );
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}
function* onGoogleSignInStart() {
  try {
    const { user } = yield call(signInWithGoogle);
    yield getSnapShotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

function* onEmailSignInStart(action) {
  try {
    const { email, password } = action.payload;
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapShotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

function* onCheckUserSession() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapShotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error.message));
  }
}

function* onSignOutStart() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error.message));
  }
}

function* sagaGoogleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, onGoogleSignInStart);
}

function* sagaEmailSignInStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, onEmailSignInStart);
}

function* sagaCheckUserSession() {
  yield takeLatest(userActionTypes.CHECK_USER_SESSION, onCheckUserSession);
}

function* signOutStart() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, onSignOutStart);
}

export function* userSaga() {
  yield all([
    call(sagaGoogleSignInStart),
    call(sagaEmailSignInStart),
    call(sagaCheckUserSession),
    call(signOutStart),
  ]);
}
