import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebas.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropDown from '../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectShowCartDropdown } from '../../redux/cart/cart.selector';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionDiv,
  OptionLink
} from './header.styles';
import './header.styles.scss';

const Header = ({ currentUser, showCartDropDown, toggleDropdown }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    {currentUser ? (
      <OptionsContainer>
        <OptionLink to="/shop">SHOP</OptionLink>
        <OptionDiv as={Link} to="/contact">
          CONTACT
        </OptionDiv>
        <OptionLink as="div" onClick={() => auth.signOut()}>
          SIGN OUT
        </OptionLink>
        <CartIcon />
      </OptionsContainer>
    ) : (
      <OptionsContainer>
        <OptionLink className="option" to="/signin">
          SIGN IN
        </OptionLink>
      </OptionsContainer>
    )}
    {showCartDropDown && <CartDropDown />}
  </HeaderContainer>
);
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  showCartDropDown: selectShowCartDropdown
});

export default connect(mapStateToProps)(Header);
