export const addItemToCart = (cartItems, itemToAdd) => {
  const isExisting = cartItems.find(item => item.id === itemToAdd.id);

  if (isExisting) {
    return cartItems.map(item =>
      item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  } else {
    return [...cartItems, { ...itemToAdd, quantity: 1 }];
  }
};

export const removeItemFromCart = (cartItems, itemToMinus) => {
  const isExisting = cartItems.find(item => item.id === itemToMinus.id);

  if (isExisting) {
    return cartItems.map(item =>
      item.id === itemToMinus.id && item.quantity > 0
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  } else return [...cartItems];
};

export const clearItemFromCart = (cartItems, itemToRemove) => {
  return cartItems.filter(item => item.id !== itemToRemove.id);
};
