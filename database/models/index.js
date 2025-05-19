const sequelize = require('../config.js');
const { DataTypes } = require('sequelize');

//Import models
const User = require('./User.js');
const Emotion = require('./Emotion.js');
const Recommendation = require('./Recommendation.js');
const Song = require('./Song');

//Create relations

Song.belongsTo(Emotion, { foreignKey: 'emotionId' });

User.hasMany(Recommendation, { foreignKey: 'userId' });
Recommendation.belongsTo(User, { foreignKey: 'userId' });

Song.hasMany(Recommendation, { foreignKey: 'songId' });
Recommendation.belongsTo(Song, { foreignKey: 'songId' });

sequelize.sync({force: false}) //Connect to our DB w/o earasingt
.then(() => {
    console.log('Database synchronized')
}).catch((err)=> {
    console.log('Sequelize error: ', err)
});

module.exports = {
  sequelize,
  User,
  Emotion,
  Recommendation,
  Song
};
