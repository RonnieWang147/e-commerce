import React from 'react';
import { connect } from 'react-redux';
import { toggleCartDropdown } from '../../redux/cart/cart.actions';
import { selectCartCount } from '../../redux/cart/cart.selector';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleDropdown, itemCount }) => (
  <div className="cart-icon" onClick={toggleDropdown}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">{itemCount}</span>
  </div>
);
const mapStateToProps = state => ({
  itemCount: selectCartCount(state)
});
const mapDispatchToProps = dispatch => ({
  toggleDropdown: () => dispatch(toggleCartDropdown())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartIcon);
