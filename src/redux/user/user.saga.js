import { takeLatest, all, call, put } from 'redux-saga/effects';

import userActionTypes from './user.types';
import { SignInSuccess, SignInFailure } from './user.actions';

import { auth, signInWithGoogle } from '../../firebase/firebas.utils';
import { createUserProfileDocument } from '../../firebase/firebas.utils';

function* getSnapShotFromUserAuth(user) {
  try {
    const userRef = yield call(createUserProfileDocument, user);
    const userSnapshot = yield userRef.get();
    yield put(
      SignInSuccess({
        id: userSnapshot.id,
        ...userSnapshot.data()
      })
    );
  } catch (error) {
    yield put(SignInFailure(error.message));
  }
}
function* onGoogleSignInStart() {
  try {
    const { user } = yield call(signInWithGoogle);
    yield getSnapShotFromUserAuth(user);
  } catch (error) {
    yield put(SignInFailure(error.message));
  }
}

function* onEmailSignInStart(action) {
  try {
    const { email, password } = action.payload;
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapShotFromUserAuth(user);
  } catch (error) {
    yield put(SignInFailure(error.message));
  }
}

function* sagaGoogleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, onGoogleSignInStart);
}

function* sagaEmailSignInStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, onEmailSignInStart);
}

export function* userSaga() {
  yield all([call(sagaGoogleSignInStart), call(sagaEmailSignInStart)]);
}
