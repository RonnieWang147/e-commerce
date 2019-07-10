import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { auth, creatUserProfileDocument } from './firebase/firebas.utils';
import { connect } from 'react-redux';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shoppage/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { setCurrentUser } from './redux/user/user.actions';

import Header from './components/header/header.component';
import './App.css';

class App extends React.Component {
  unsubscribeFromAuth = null;
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // this.setState({ currentUser: userAuth, isLoading: false });
      if (userAuth) {
        const userRef = await creatUserProfileDocument(userAuth);

        this.unsubscribeFromSnapshot = userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        setCurrentUser(null);
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
    this.unsubscribeFromSnapshot();
  }
  render() {
    const { currentUser } = this.props;
    return (
      <>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
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
const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
