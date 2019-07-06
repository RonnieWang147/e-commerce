import React from 'react';
import { Link } from 'react-router-dom';
import Directory from '../../components/directory/directory.component';
import './homepage.styles.scss';

const HomePage = props => (
  <div className="homepage">
    <Link to="/hats">to hats</Link>
    <Directory />
  </div>
);

export default HomePage;
