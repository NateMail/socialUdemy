const express = require('express');
const {
  getPosts,
  createPost,
  postsByUser,
  postById,
  isPoster,
  deletePost,
  updatePost,
  singlePost,
  like,
  unlike,
  photo
} = require('../controllers/post');
const { requireSignin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { createPostValidator } = require('../controllers/validator');

const router = express.Router();

router.get('/posts', getPosts);
router.put('/post/like', requireSignin, like);
router.put('/post/unlike', requireSignin, unlike);

router.put('/post/:postId', requireSignin, isPoster, updatePost);

router.post(
  '/post/new/:userId',
  requireSignin,
  createPost,
  createPostValidator
);

router.get('/posts/by/:userId', postsByUser);
router.get('/post/:postId', singlePost);
router.delete('/post/:postId', requireSignin, isPoster, deletePost);

router.get('/post/photo/:postId', photo);

// any route containing :userId, our app will first execute userById()
router.param('userId', userById);

router.param('postId', postById);

module.exports = router;
