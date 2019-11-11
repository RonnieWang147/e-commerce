import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import mainReducer from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, sagaMiddleware];
if (process.env.NODE_ENV === 'development') middlewares.push(logger);
export const store = createStore(mainReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
