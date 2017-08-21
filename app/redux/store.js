import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as routerReducer } from 'react-native-router-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';

// middlewares
import fsaThunkMiddleware from 'redux-fsa-thunk';
import promiseMiddleware from 'redux-promise';
import createLogger from 'redux-logger';

import reducers from '../redux';

const loggerMiddleware = createLogger({
  predicate: (getState, action) => action.type.indexOf('redux-form') === -1
});

const reducer = combineReducers({
  app: reducers,
  form: formReducer,
  router: routerReducer
});


const middlewares = [fsaThunkMiddleware, promiseMiddleware, loggerMiddleware];

const store = createStore(reducer,
  applyMiddleware(...middlewares),
  autoRehydrate()
);

persistStore(store, {
  storage: AsyncStorage,
  whitelist: ['app']
});

export default store;
