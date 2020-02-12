var express = require('express');
var router = express.Router();

const { authController, postController, blogController } = require('../controller');

router.get('/', function(req, res, next) {
  res.send('server exists');
});

router.post('/signup', authController.signup.post);

router.post('/signin', authController.signin.post);

router.post('/signout', authController.signout.post);

router.post('/post', postController.board.post);

router.get('/post', postController.board.get);

router.get('/post/:id', postController.boardbyid.get);

router.get('/blog/main', blogController.main.get);

router.get('/blog/dev', blogController.dev.get);

router.get('/blog/plain', blogController.plain.get);

router.get('/blog/til', blogController.til.get);

router.get('/blog/tech', blogController.tech.get);

module.exports = router;
