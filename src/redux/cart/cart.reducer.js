import { CartActionTypes } from './cart.types';
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from './cart.utils';

const INIT_STATES = {
  showCartDropDown: false,
  cartItems: [],
};

const cartReducer = (state = INIT_STATES, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_DROPDOWN:
      return { ...state, showCartDropDown: !state.showCartDropDown };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case CartActionTypes.CLEAR_ITEM:
      return {
        ...state,
        cartItems: clearItemFromCart(state.cartItems, action.payload),
      };
    case CartActionTypes.MINUS_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
