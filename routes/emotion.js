var express = require('express');
var router = express.Router();
const emotionController = require('../controllers/emotion.controller')
const {verifyToken} = require('../middlewares/auth.middleware')

/* POST: Analyze emotion */
router.post('/detect-emotion', verifyToken, emotionController.detectEmotion);

module.exports = router;