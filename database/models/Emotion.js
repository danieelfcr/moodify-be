const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

class Emotion extends Model {}

Emotion.init(
  {
    label: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    confidence: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Emotion',
    timestamps: true,
    paranoid: true
  }
);

module.exports = Emotion;
