import React from 'react';

import './custom-button.styles.scss';

const CustomBotton = ({ children, isGoogleSignIn, ...otherPorps }) => (
  <button
    className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`}
    {...otherPorps}
  >
    {children}
  </button>
);

export default CustomBotton;
