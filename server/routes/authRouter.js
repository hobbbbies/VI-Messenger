const express = require("express");
const router = express.Router();
const controller = require('../controllers/authController');
const getToken = require('../middleware/getToken');
const verifyToken = require('../middleware/verifyToken');

router.post('/login', controller.loginUser);

router.post('/signup', controller.registerUser);

router.delete('/deleteUser', getToken, verifyToken, controller.deleteUser);

module.exports = router;