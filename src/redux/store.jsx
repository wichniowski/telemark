/* global window, __DEVELOPMENT__ */

import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducer';

const middleware = [thunk];

const createStoreWithMiddleware = createStore(
    combineReducers(reducers),
    {},
    compose(
        applyMiddleware(...middleware),
        window.devToolsExtension ? window.devToolsExtension() : (f) => f
    )
);

export default createStoreWithMiddleware;
