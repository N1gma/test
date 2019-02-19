import { call, put, all, takeEvery, takeLatest } from 'redux-saga/effects';
import moviesSagas from 'redux/ducks/movies/sagas';

export default function* rootSaga() {
  yield all([...moviesSagas]);
}
