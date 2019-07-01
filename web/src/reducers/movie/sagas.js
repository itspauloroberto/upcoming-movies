import { put, takeLatest } from 'redux-saga/effects';
import {
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_FETCHING,
  MOVIE_LIST_SUCCESS,
  MOVIE_LIST_FAILURE
} from '../../models/movie/constants';
import { fetchMovies } from '../../models/movie/api';

function* _watchFetchMovies({ payload }) {
  yield put({ type: MOVIE_LIST_FETCHING });
  try {
    const { results } = yield fetchMovies(payload);
    yield put({ type: MOVIE_LIST_SUCCESS, payload: results });
  } catch(error) {
    yield put({ type: MOVIE_LIST_FAILURE, payload: error });
  }
}

export function* watchFetchMovies() {
  yield takeLatest(MOVIE_LIST_REQUEST, _watchFetchMovies);
}