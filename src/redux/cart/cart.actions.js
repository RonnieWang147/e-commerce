import { CartActionTypes } from './cart.types';

export const toggleCartDropdown = () => ({
  type: CartActionTypes.TOGGLE_CART_DROPDOWN,
});

export const addItem = (item) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item,
});

export const clearItem = (item) => ({
  type: CartActionTypes.CLEAR_ITEM,
  payload: item,
});

export const removeItem = (item) => ({
  type: CartActionTypes.MINUS_ITEM,
  payload: item,
});

export const clearCart = () => ({
  type: CartActionTypes.CLEAR_CART,
});
