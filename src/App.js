import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { auth, creatUserProfileDocument } from './firebase/firebas.utils';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shoppage/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import Header from './components/header/header.component';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isLoading: true
    };
  }
  unsubscribeFromAuth = null;
  unsubscribeFromSnapshot = null;
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // this.setState({ currentUser: userAuth, isLoading: false });
      if (userAuth) {
        const userRef = await creatUserProfileDocument(userAuth);

        this.unsubscribeFromSnapshot = userRef.onSnapshot(snapShot => {
          this.setState(
            {
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              },
              isLoading: false
            },
            () => {
              console.log(this.state.currentUser);
            }
          );
        });
      } else {
        this.setState({ currentUser: null, isLoading: false });
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth();
    this.unsubscribeFromSnapshot();
  }
  render() {
    if (this.state.isLoading) return null;
    return (
      <>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInAndSignUp} />
          <Route path="/" render={() => <div>404 not found</div>} />
        </Switch>
      </>
    );
  }
}

export default App;
