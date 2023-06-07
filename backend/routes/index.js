const express = require('express')
const router = express.Router();
const authController = require('../controller/authController');
const auth = require('../middleware/auth');

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


module.exports = router;