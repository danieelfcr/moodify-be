const rekognition = require('../services/rekognition');
const { Recommendation, Emotion, Song } = require('../database/models');
const { DetectFacesCommand } = require('@aws-sdk/client-rekognition');

exports.generateRecommendations = async (userId, emotionName, res) => {
    try {
        
        const emotion = await Emotion.findOne({ where: {name: emotionName}});
        const songs = await Song.findAll({
            where: {emotionId: emotion.id},
            order: Sequelize.literal('RAND()'),
            limit: 3
        })

        const recommendations = [];

        for (const song of songs) {
            const recommendation = await Recommendation.create({
            userId: userId,
            songId: song.id,
            timestamp: new Date()
            });
            recommendations.push(song);
        }

        return recommendations;
        
    } catch (error) {
        console.error("Error in server:", error);
        res.status(500).json({ error: 'Error in server', detail: error.message });
    }
};
