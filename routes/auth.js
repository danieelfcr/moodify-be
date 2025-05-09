var express = require('express');
var router = express.Router();
const loginController = require('../controllers/auth.controller');

/* POST: Log in */
router.post('/login', loginController.login);

module.exports = router;
