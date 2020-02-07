var express = require('express');
var router = express.Router();

const { authController } = require('../controller');

router.get('/', function(req, res, next) {
  res.send('server exists');
});

router.post('/signup', authController.signup.post);

router.post('/signin', authController.signin.post);

router.post('/signout', authController.signout.post);

module.exports = router;
