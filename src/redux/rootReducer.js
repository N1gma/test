import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer as formReducer } from 'redux-form'
import moviesReducer from 'redux/ducks/movies';
import uiReducer from 'redux/ducks/ui';

export default history =>
  combineReducers({
    router: connectRouter(history),
    form: formReducer,
    movies: moviesReducer,
    ui: uiReducer,
  });
