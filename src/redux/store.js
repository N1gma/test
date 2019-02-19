import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from 'redux/rootReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'redux/rootSaga'

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = preloadedState => {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
