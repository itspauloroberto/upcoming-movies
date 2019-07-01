import { all, fork } from 'redux-saga/effects';
import { watchFetchMovies } from './movie/sagas';

export default function* root() {
  yield all([
    fork(watchFetchMovies),
  ]);
}
