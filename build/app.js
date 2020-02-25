"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const router = require('./routes');
const app = express();
const port = 8000;
app.use(session({
    secret: '@warrmansion',
    resave: false,
    saveUninitialized: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
    origin: ['http://code-log.s3-website.ap-northeast-2.amazonaws.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(morgan('dev'));
app.use('/', router);
app.set('port', port);
app.listen(app.get('port'), () => {
    console.log(`app is listening in PORT ${app.get('port')}`);
});
module.exports = app;
