const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

class Emotion extends Model {}

Emotion.init(
  {
    label: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Emotion',
    tableName: 'emotion',
    timestamps: true,
    paranoid: true
  }
);

module.exports = Emotion;
