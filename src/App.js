import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shoppage/shop.component';
import Header from './components/header/header.component';
import './App.css';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/shop" component={ShopPage} />
        <Route path="/" render={() => <div>404 not found</div>} />
      </Switch>
    </>
  );
}

export default App;
