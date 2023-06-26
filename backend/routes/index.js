const express = require('express')
const router = express.Router();
const authController = require('../controller/authController');
const auth = require('../middleware/auth');
const blogController = require('../controller/blogController');

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

//getAllBlogs
router.post('/blog/create', auth, blogController.create);

//getAllBlogs
router.get('/blog/all', auth, blogController.getAll);

//DeleteABlogs
router.post('/blog/delete', auth, blogController.delete);

//BlogById
router.get('/blog/:id', auth, blogController.getById);

module.exports = router;