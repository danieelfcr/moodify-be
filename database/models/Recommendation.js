const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

class Recommendation extends Model {}

Recommendation.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    songId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'song',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  },
  {
    sequelize,
    modelName: 'Recommendation',
    tableName: 'recommendation',
    timestamps: true,
    paranoid: true
  }
);

module.exports = Recommendation;
