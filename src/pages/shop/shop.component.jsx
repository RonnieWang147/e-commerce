import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateCollections } from '../../redux/shop/shop.actions';

import CollectionsOverview from '../../components/collections-overview/collection-overview.component';
import CollectionPage from '../collection/collection.component';

import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebas.utils';

import './shop.styles.scss';

class ShopPage extends React.Component {
  unsubscribeFireSnapshot = null;
  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');
    this.unsubscribeFireSnapshot = collectionRef.onSnapshot(
      collectionsSnapShot => {
        const collectionsMap = convertCollectionsSnapshotToMap(
          collectionsSnapShot
        );
        console.log(collectionsMap);
        updateCollections(collectionsMap);
      }
    );
  }
  componentWillUnmount() {
    this.unsubscribeFireSnapshot();
  }
  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route exact path={match.path} component={CollectionsOverview} />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
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
