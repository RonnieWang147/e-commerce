import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from '../../components/collections-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';

import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebas.utils';

import './shop.styles.scss';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {
  state = {
    isLoading: true
  };
  unsubscribeFireSnapshot = null;
  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');

    collectionRef.get().then(collectionsSnapShot => {
      const collectionsMap = convertCollectionsSnapshotToMap(
        collectionsSnapShot
      );
      console.log(collectionsMap);
      updateCollections(collectionsMap);
      this.setState({ isLoading: false });
    });

    // this.unsubscribeFireSnapshot = collectionRef.onSnapshot(
    //   collectionsSnapShot => {
    //     const collectionsMap = convertCollectionsSnapshotToMap(
    //       collectionsSnapShot
    //     );
    //     console.log(collectionsMap);
    //     updateCollections(collectionsMap);
    //     this.setState({ isLoading: false });
    //   }
    // );
  }
  componentWillUnmount() {
    // this.unsubscribeFireSnapshot();
  }
  render() {
    const { match } = this.props;
    const isLoading = this.state.isLoading;
    return (
      <div className="shop-page">
        <Route
          exact
          path={match.path}
          render={props => (
            <CollectionsOverviewWithSpinner isLoading={isLoading} {...props} />
          )}
        />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner isLoading={isLoading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap))
});
export default connect(
  null,
  mapDispatchToProps
)(ShopPage);
