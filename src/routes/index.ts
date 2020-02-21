var express = require('express');
var router = express.Router();

const {
  authController,
  postController,
  blogController,
  mypageController,
  tagController,
  homeController,
} = require('../controller');

// * AUTH

router.post('/signup', authController.signup.post);

router.post('/signup/company', authController.csignup.post);

router.post('/signin', authController.signin.post);

router.post('/signout', authController.signout.post);

router.post('/duplicate', authController.duplicate.post);

// * MYPAGE

router.get('/mypage', mypageController.developer.get);

router.get('/mypage/company', mypageController.company.get);

// * POST

router.post('/post', postController.board.post);

router.get('/post', postController.board.get);

router.put('/post', postController.board.put);

router.delete('/post', postController.board.delete);

router.post('/post/update', postController.board.put);

router.post('/post/delete', postController.board.delete);

router.post('/post/delete/:id', postController.boardbyid.delete);

router.get('/post/:id', postController.boardbyid.get);

router.delete('/post/:id', postController.boardbyid.delete);

router.post('/post/like', postController.like.post);

router.post('/post/like/:id', postController.likebyid.post);

router.post('/post/dislike', postController.like.delete);

router.post('/post/dislike/:id', postController.likebyid.delete);

router.delete('/post/like', postController.like.delete);

router.delete('/post/like/:id', postController.likebyid.delete);

// * BLOG

router.get('/blog', blogController.main.get);

router.get('/blog/dev', blogController.dev.get);

router.get('/blog/plain', blogController.plain.get);

router.get('/blog/til', blogController.til.get);

router.get('/blog/tech', blogController.tech.get);

router.get('/tags', tagController.get);

router.get('/home', homeController.get);

module.exports = router;
