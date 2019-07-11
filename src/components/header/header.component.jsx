import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../firebase/firebas.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import './header.styles.scss';

const Header = ({ currentUser, showCartDropDown, toggleDropdown }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    {currentUser ? (
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/contact">
          CONTACT
        </Link>
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
        <CartIcon />
      </div>
    ) : (
      <div className="options">
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      </div>
    )}
    {showCartDropDown && <CartDropDown />}
  </div>
);
const mapStateToProps = ({
  user: { currentUser },
  cart: { showCartDropDown }
}) => ({
  currentUser: currentUser,
  showCartDropDown: showCartDropDown
});

export default connect(mapStateToProps)(Header);
