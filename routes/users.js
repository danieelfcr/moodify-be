var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
const {verifyToken} = require('../middlewares/auth.middleware')

/* POST: Sign up */
router.post('/create-user', userController.postUser);

/* GET: History */
router.get('/history/:userId', verifyToken, userController.getUserHistory);

module.exports = router;
