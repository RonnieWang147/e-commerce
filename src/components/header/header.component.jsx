import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebas.utils';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import './header.styles.scss';

const Header = props => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    {props.currentUser ? (
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
      </div>
    ) : (
      <div className="options">
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      </div>
    )}
  </div>
);

export default Header;
