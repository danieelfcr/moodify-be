var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');

/* POST: Sign up */
router.post('/create-user', userController.postUser);

module.exports = router;
