import {
  MOVIE_LIST_REQUEST,
  MOVIE_SET_ACTIVE
} from './constants';

export const fetchMovies = (page, genre) => ({ type: MOVIE_LIST_REQUEST, payload: { page, genre }});
export const setActiveMovie = movie => ({ type: MOVIE_SET_ACTIVE, payload: movie });