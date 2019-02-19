import { handleActions } from 'redux-actions';
import * as moviesActionTypes from './actionTypes';
import { withSuffixModSucess } from 'utils/redux';

const initialState = [];

const reducer = handleActions(
  {
    [withSuffixModSucess(moviesActionTypes.GET_MOVIES)]: (state, { payload }) => payload,
    [moviesActionTypes.ADD_MOVIE]: (state, { payload: movie }) => [
      ...state,
      {
        ...movie,
        imdbID: Math.random()
      }
    ],
    [moviesActionTypes.EDIT_MOVIE]: (state, { payload }) => state.map(movie => movie.imdbID === payload.imdbID ? payload : movie),
    [moviesActionTypes.DELETE_MOVIE]: (state, { payload: imdbIDToDelete }) => state.filter(movie => movie.imdbID !== imdbIDToDelete),
  },
  initialState,
);

export default reducer;
