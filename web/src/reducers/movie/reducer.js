import {
  MOVIE_LIST_FETCHING,
  MOVIE_LIST_SUCCESS,
  MOVIE_LIST_FAILURE,
  MOVIE_SET_ACTIVE
} from '../../models/movie/constants';

const INITIALSTATE = {
  isFetching: false,
  error: null,
  movieList: [],
  activeMovie: null
};

export default function (state = INITIALSTATE, action) {
  switch (action.type) {
    case MOVIE_LIST_FETCHING:
      return {
        ...state,
        isFetching: true,
      };
    case MOVIE_LIST_SUCCESS:
      return {
        ...state,
        isFetching: false,
        movieList: action.payload
      };
    case MOVIE_LIST_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case MOVIE_SET_ACTIVE:
      return {
        ...state,
        activeMovie: action.payload
      };
    default:
      return state;
  }
};