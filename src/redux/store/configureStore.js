import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export default function configureStore(initialState = {}) {
  const middleware = [
    thunk
  ];

  // middleware.push(logger);

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );


  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}