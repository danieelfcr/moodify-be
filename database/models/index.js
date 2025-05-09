const sequelize = require('../config.js');
const { DataTypes } = require('sequelize');

//Import models
const User = require('./User.js');
const Emotion = require('./Emotion.js');
const Recommendation = require('./Recommendation.js');

//Create relations
User.hasMany(Emotion, { foreignKey: 'userId' });
Emotion.belongsTo(User, { foreignKey: 'userId' });

Emotion.hasMany(Recommendation, { foreignKey: 'emotionId' });
Recommendation.belongsTo(Emotion, { foreignKey: 'emotionId' });

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
  Recommendation
};
