const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

class Recommendation extends Model {}

Recommendation.init(
  {
    trackName: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    artistName: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    spotifyUrl: {
      type: DataTypes.STRING(500)
    }
  },
  {
    sequelize,
    modelName: 'Recommendation',
    timestamps: true,
    paranoid: true
  }
);

module.exports = Recommendation;
