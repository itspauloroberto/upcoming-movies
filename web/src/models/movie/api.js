import cfg from '../../config/';
import { makeAPIRequest } from '../../helpers/functions';

export const fetchMovies = ({ page, genre }) => (
  makeAPIRequest(
    genre
    ? `${cfg.apiEndpointURL}/movies/upcoming/genre/${genre}/${page||1}`
    : `${cfg.apiEndpointURL}/movies/upcoming/${page||1}`,
    { method: 'GET' }
  )
)