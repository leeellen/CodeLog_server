var express = require('express');
var router = express.Router();

const {
  authController,
  postController,
  blogController,
  mypageController,
  tagController,
} = require('../controller');

router.get('/', function(req, res, next) {
  res.send('server exists');
});

router.post('/signup', authController.signup.post);

router.post('/signin', authController.signin.post);

router.post('/signout', authController.signout.post);

router.post('/duplicate', authController.duplicate.post);

router.post('/post', postController.board.post);

router.get('/mypage/company', mypageController.company.get);

router.get('/mypage', mypageController.developer.get);

router.get('/post', postController.board.get);

router.get('/post/:id', postController.boardbyid.get);

router.post('/post/update', postController.update.post);

router.post('/post/delete', postController.delete.post);

router.post('/post/like', postController.like.post);

router.get('/blog', blogController.main.get);

router.get('/blog/dev', blogController.dev.get);

router.get('/blog/plain', blogController.plain.get);

router.get('/blog/til', blogController.til.get);

router.get('/blog/tech', blogController.tech.get);

router.get('/tags', tagController.get);

module.exports = router;
