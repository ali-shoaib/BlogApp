const express = require('express')
const router = express.Router();
const authController = require('../controller/authController');

//testing
router.get('/test', (req, res) => res.send("Hello world 123"));

//login
router.post('/login', authController.login);

//register
router.post('/register', authController.register);

//getAllUsers
router.get('/allusers', authController.getAllUsers);


module.exports = router;