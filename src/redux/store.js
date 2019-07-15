import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import mainReducer from './root-reducer';

const middlewares = [thunk];
if (process.env.NODE_ENV === 'development') middlewares.push(logger);
export const store = createStore(mainReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);
