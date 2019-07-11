import { CartActionTypes } from './cart.types';
import { addItemToCart } from './cart.utils';

const INIT_STATES = {
  showCartDropDown: false,
  cartItems: []
};

const cartReducer = (state = INIT_STATES, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_DROPDOWN:
      return { ...state, showCartDropDown: !state.showCartDropDown };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload)
      };
    default:
      return state;
  }
};

export default cartReducer;
