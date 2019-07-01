const express = require('express');
const router = express.Router();
const { getRequestURL, limiter } = require('../modules/base/requests');
const { PATH_UPCOMING_MOVIES } = require('../helpers/constants');

const getUpcomingMovies = ({ page, genre }, res) => (
  limiter.request({
    url: getRequestURL(PATH_UPCOMING_MOVIES, { page }),
    method: 'get'
  }).then(response => {
    const jsonResponse = JSON.parse(response.body);
    const {
      status_code: status,
      status_message: message,
      success,
      results
    } = jsonResponse;
    if (success && success === false)
      console.error(`Success: ${success} \nStatus: ${status} \nMessage: ${message}`);
    if (genre && genre.length > 0)
      jsonResponse.results = results.filter(r => r.genre_ids.includes(parseInt(genre)));
    res.status(response.statusCode).send(jsonResponse);
  }).catch(err => {
    console.error(err);
    res.status(err.statusCode).send(err);
  })
)
const requestHandler = ({ params }, res) => getUpcomingMovies(params, res);
 
router.get('/upcoming/:page', requestHandler);
router.get('/upcoming/genre/:genreId/:page', requestHandler);

module.exports = router;
