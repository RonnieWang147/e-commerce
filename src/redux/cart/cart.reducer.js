import { CartActionTypes } from './cart.types';
const INIT_STATES = {
  showCartDropDown: false
};

const cartReducer = (state = INIT_STATES, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_DROPDOWN:
      return { ...state, showCartDropDown: !state.showCartDropDown };
    default:
      return state;
  }
};

export default cartReducer;
