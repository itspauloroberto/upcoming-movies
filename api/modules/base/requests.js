const { TMDBApi:api } = require('../../config/');
const RateLimiter = require('request-rate-limiter');
const { requestsLimit, limitTimeoutMS } = api;

setInterval(() => { requestCounter = 0; }, limitTimeoutMS);

const limiter = new RateLimiter({
  rate: requestsLimit
  ,interval: (limitTimeoutMS / 1000)
  ,backoffCode: 429
  ,backoffTime: 8
  ,maxWaitingTime: 100
});

const getRequestURL = (path, additionalParams) => {
  const {
    key,
    endpointURL
  } = api;
  const defaultParameters = Object.assign({
    "api_key": key
  }, additionalParams);
  const params = Object.keys(defaultParameters).map(p => `${p}=${defaultParameters[p]}`).join('&');
  const finalURL = `${endpointURL}${path}?${params}`;
  return finalURL;
};

module.exports = {
  getRequestURL,
  limiter
}