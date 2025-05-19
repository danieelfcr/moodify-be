var express = require('express');
var router = express.Router();
const recommendationController = require('../controllers/recommendation.controller')
const {verifyToken} = require('../middlewares/auth.middleware')

/* POST: Generate recommendations and post to DB */
router.post('/generate-recommendations', verifyToken, recommendationController.generateRecommendations);

module.exports = router;