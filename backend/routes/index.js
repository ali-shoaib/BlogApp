const express = require('express')
const router = express.Router();
const authController = require('../controller/authController');
const auth = require('../middleware/auth');
const blogController = require('../controller/blogController');
const commentController = require('../controller/commentController');
const likeController = require('../controller/likeController');

//testing
router.get('/test', (req, res) => {
    console.log("ola! => ",req)
    return res.status(200).send({
        success:true,
        message:"good work!",
    });
});

//login
router.post('/login', authController.login);

//register
router.post('/register', authController.register);

//change password
router.post('/reset-password', auth, authController.resetPassword);

//logout
router.post('/logout', auth ,authController.logout);

// refresh
router.get('/refresh', authController.refresh);

//getAllUsers
router.get('/allusers', authController.getAllUsers);

//deleteAUser
router.post('/deleteuser', authController.deleteUser);

//createBlog
router.post('/blog/create', auth, blogController.create);

//getAllBlogs
router.get('/blog/all/:author', auth, blogController.getAll);

//DeleteABlogs
router.post('/blog/delete', auth, blogController.delete);

//BlogById
router.get('/blog/:id', auth, blogController.getById);

//UpdateBlog
router.put('/blog/update', auth, blogController.update);

// CreateComment
router.post('/comment/create', auth, commentController.create);

// GetCommentsById
router.get('/comment/:id', auth, commentController.getById);

//Like
router.post('/like', auth, likeController.create);

// GetLikesById
router.get('/like/:id', auth, likeController.getById);

//DeleteAllLikes
router.get('/like/deleteAll', auth, likeController.deleteAll);

//getAllAuthorsWhoLiked
router.post('/like/authors', auth, likeController.allAuthors);

//UpdateComment
router.post('/comment/update', auth, commentController.updateComment);

//forget password
router.post('/forget-password', auth, authController.forgetPassword);

module.exports = router;