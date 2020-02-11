var express = require('express');
var router = express.Router();

const { authController, postController } = require('../controller');

router.get('/', function(req, res, next) {
  res.send('server exists');
});

router.post('/signup', authController.signup.post);

router.post('/signin', authController.signin.post);

router.post('/signout', authController.signout.post);

router.post('/post', postController.create.post);

module.exports = router;
