import UserActionTypes from './user.types';
const INIT_STATE = {
  currentUser: null,
  errorMessage: null
};

const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        errorMessage: null
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
    case UserActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        currentUser: null,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
