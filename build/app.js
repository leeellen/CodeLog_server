'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
var os = require('os');
const morgan = require('morgan');
const router = require('./routes');
const app = express();
const port = 3001;
app.use(
  session({
    secret: '@warrmansion',
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  }),
);
app.use(morgan('dev'));
app.use('/', router);
app.set('port', port);
app.listen(app.get('port'), () => {
  console.log(`app is listening in HOST ${os.hostname()} PORT ${app.get('port')}`);
});
module.exports = app;
