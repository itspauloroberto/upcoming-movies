const app = require('./app');
const http = require('http');
const port = normalizePort(process.env.PORT || '3001');

const server = http.createServer(app);
server.listen(port);

function normalizePort(val) {
  const port = parseInt(val, 10);
  return isNaN(port) ? val : (port >= 0) ? port : false;
}
