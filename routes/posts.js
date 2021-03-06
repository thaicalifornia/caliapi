const express = require('express');

const {getPosts,createPost,
        postsByUser,postById,
        updatePost,
        isPoster,deletePost,photo,
        singlePost,like,unlike,
        comment,uncomment
} = require('../controllers/post');
const {requireSignin} = require('../controllers/auth');
const {userById} = require('../controllers/user');
const {createPostValidator} = require('../validator');

const router = express.Router();

// router.get("/", getPosts);
router.get("/posts", getPosts);

router.put("/post/like", requireSignin, like);
router.put("/post/unlike", requireSignin, unlike);

router.put("/post/comment", requireSignin, comment);
router.put("/post/uncomment", requireSignin, uncomment);
// router.put('/post/updatecomment', requireSignin, updateComment);

router.post("/post/new/:userId", requireSignin,createPost,createPostValidator);
router.get("/posts/by/:userId", requireSignin, postsByUser);

router.get('/post/:postId', singlePost)

router.put("/post/:postId", requireSignin, isPoster, updatePost);
router.delete("/post/:postId", requireSignin, isPoster, deletePost)

router.get("/post/photo/:postId", photo);

router.param("userId", userById);
router.param("postId", postById)

module.exports = router;