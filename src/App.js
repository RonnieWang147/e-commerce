import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions';

import Header from './components/header/header.component';

import './App.css';

class App extends React.Component {
  // unsubscribeFromAuth = null;
  // unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
    // const { setCurrentUser } = this.props;
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   // this.setState({ currentUser: userAuth, isLoading: false });
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);

    //     this.unsubscribeFromSnapshot = userRef.onSnapshot(snapShot => {
    //       setCurrentUser({
    //         id: snapShot.id,
    //         ...snapShot.data()
    //       });
    //     });
    //   } else {
    //     setCurrentUser(null);
    //   }
    // });
  }
  // componentWillUnmount() {
  //   this.unsubscribeFromAuth();
  //   this.unsubscribeFromSnapshot();
  // }
  render() {
    const { currentUser } = this.props;
    return (
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() => {
              if (currentUser) return <Redirect to="/" />;
              else return <SignInAndSignUp />;
            }}
          />
          <Route path="/" render={() => <div>404 not found</div>} />
        </Switch>
      </>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: user => dispatch(checkUserSession())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
