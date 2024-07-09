const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

router.get('/users', (req, res) => {userController.rgstUsers(req, res)});
router.get('/users/sign_in', (req, res) => {userController.signInUsers(req, res)});


module.exports = router;
