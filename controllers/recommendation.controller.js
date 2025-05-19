const rekognition = require('../services/rekognition');
const { Recommendation, Emotion, Song } = require('../database/models');
const { Sequelize } = require('../database/config')

exports.generateRecommendations = async (req, res) => {
    try {
        
        const emotion = await Emotion.findOne({ where: {label: req.body.emotionName}});
        const songs = await Song.findAll({
            where: {emotionId: emotion.id},
            order: Sequelize.literal('RAND()'),
            limit: 3
        })

        const recommendations = [];

        for (const song of songs) {
            const recommendation = await Recommendation.create({
                userId: req.body.userId,
                songId: song.id
            });
            recommendations.push(song);
        }

        res.status(200).json({
            recommendations: recommendations.map(song => ({
                artist: song.artist,
                songName: song.songName
            }))
        });
        
    } catch (error) {
        console.error("Error in server:", error);
        res.status(500).json({ error: 'Error in server', detail: error.message });
    }
};
