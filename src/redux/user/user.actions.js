import UserActionTypes from './user.types';

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const SignInSuccess = user => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user
});
export const SignInFailure = errorMessage => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: errorMessage
});

export const emailSignInStart = emailAndPassword => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword
});
