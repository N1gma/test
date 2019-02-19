import { takeEvery, call, all, put } from 'redux-saga/effects';
import * as moviesActionTypes from './actionTypes';
import { fetchMoviesSuccess } from './actions';
import moviesNetworkService from 'services/network/movies';

function* fetchMoviesSaga() {
  const response = yield all([
    call(moviesNetworkService.get1),
    call(moviesNetworkService.get2),
    call(moviesNetworkService.get3),
  ]);

  const movies = response.map(({ data }) => data);

  yield put(fetchMoviesSuccess(movies));
}

export default [takeEvery(moviesActionTypes.GET_MOVIES, fetchMoviesSaga)];
