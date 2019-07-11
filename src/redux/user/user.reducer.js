import { UserActionTypes } from './user.types';
const INIT_STATE = {
  currentUser: null,
  isLoading: true
};

const userReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};

export default userReducer;
