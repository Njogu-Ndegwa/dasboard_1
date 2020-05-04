import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from 'redux-logger';

import rootReducer from '../_reducers';

import { handleBodyClasses, layoutInit, dumpLayoutToStorage } from '../common/layout';
import { i18nInit } from '../common/i18n';

const loggerMiddleware = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(
            thunkMiddleware,
            handleBodyClasses,
            dumpLayoutToStorage
        )
    )
);

export const initialApp = () => {
    store.dispatch(layoutInit());
    store.dispatch(i18nInit());
};