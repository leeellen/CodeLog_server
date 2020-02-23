var express = require('express');
var router = express.Router();

const {
  authController,
  postController,
  blogController,
  mypageController,
  companyController,
  tagController,
  homeController,
  verify,
} = require('../controller');

// * AUTH

router.post('/signup', authController.signup.post);

router.post('/signup/company', authController.csignup.post);

router.post('/signin', authController.signin.post);

router.post('/signin/company', authController.csignin.post);

router.post('/signout', authController.signout.post);

router.post('/duplicate', authController.duplicate.post);

// * MYPAGE

router.get('/mypage', mypageController.get);

router.put('/mypage', mypageController.put);

router.post('/mypage/update', mypageController.put);

// * COMPANY

router.get('/company', companyController.get);

router.put('/company', companyController.put);

router.post('/company/update', companyController.put);

router.post('/company/member/update', companyController.member.put);

router.post('/company/member/delete', companyController.member.delete);

router.post('/company/member/delete/:id', companyController.memberbyid.delete);

// * POST

router.post('/post', postController.board.post);

router.post('/test', postController.board.test);

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

// * TAG

router.get('/tags', tagController.get);

// * HOME

router.get('/home', homeController.get);

// * VERIFY

router.get('/auth', verify.get);

router.post('/auth', verify.post);

module.exports = router;
