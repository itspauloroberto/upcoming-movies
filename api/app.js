const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { web:{ port, host } } = require('./config');

const indexRouter = require('./routes/index');
const moviesRouter = require('./routes/movies');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: `${host}:${port}` }));

app.use('/', indexRouter);
app.use('/movies', moviesRouter);

module.exports = app;