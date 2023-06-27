const express = require('express')
const router = express.Router();
const authController = require('../controller/authController');
const auth = require('../middleware/auth');
const blogController = require('../controller/blogController');
const commentController = require('../controller/commentController');

//testing
router.get('/test', (req, res) => res.send("Hello world 123"));

//login
router.post('/login', authController.login);

//register
router.post('/register', authController.register);

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
router.get('/blog/all', auth, blogController.getAll);

//DeleteABlogs
router.post('/blog/delete', auth, blogController.delete);

//BlogById
router.get('/blog/:id', auth, blogController.getById);

//UpdateBlog
router.put('/blog/update', auth, blogController.update);

// CreateComment
router.post('/comment/create', auth, commentController.create);

// GetCommentById
router.get('/comment/:id', auth, commentController.getById);

module.exports = router;