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
