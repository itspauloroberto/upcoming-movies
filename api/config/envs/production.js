const config = {
  TMDBApi: {
    key: '1f54bd990f1cdfb230adb312546d765d',
    endpointURL: 'https://api.themoviedb.org/3/',
    requestsLimit: 40,
    limitTimeoutMS: 10000
  },
  web: {
    host: 'http://localhost',
    port: 3000
  }
}

module.exports = config;