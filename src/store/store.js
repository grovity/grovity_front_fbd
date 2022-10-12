import {applyMiddleware, compose, createStore} from 'redux';
import promiseMiddleware from 'redux-promise';
import reducers from '../reducers';
import thunk from 'redux-thunk';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createSagaMiddleware from 'redux-saga';

const saga = createSagaMiddleware();

const middleware = [thunk, saga];


const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
};
const pReducer = persistReducer(persistConfig, reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(pReducer, {},
    composeEnhancers(applyMiddleware(promiseMiddleware, ...middleware)));

export const persistor = persistStore(store);
