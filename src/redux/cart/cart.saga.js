import { takeLatest, call, all, put } from 'redux-saga/effects';
import UserActionTypes from '../user/user.types';
import { clearCart } from './cart.actions';

function* clearCartOnSignOut() {
  yield put(clearCart());
}
function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}
export function* cartSaga() {
  yield all([call(onSignOutSuccess)]);
}
