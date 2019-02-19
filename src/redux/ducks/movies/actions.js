import * as moviesActionTypes from './actionTypes';
import { withSuffixModSucess } from 'utils/redux';

export const fetchMovies = () => ({
  type: moviesActionTypes.GET_MOVIES,
});

export const fetchMoviesSuccess = payload => ({
  type: withSuffixModSucess(moviesActionTypes.GET_MOVIES),
  payload,
});

export const addMovie = movie => ({
  type: moviesActionTypes.ADD_MOVIE,
  payload: movie,
});

export const deleteMovie = id => ({
  type: moviesActionTypes.DELETE_MOVIE,
  payload: id,
});

export const editMovie = movie => ({
  type: moviesActionTypes.EDIT_MOVIE,
  payload: movie,
});