const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

class Song extends Model {}

Song.init(
  {
    artist: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    songName: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    emotionId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'emotion',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    }
  },
  {
    sequelize,
    modelName: 'Song',
    tableName: 'song',
    timestamps: true,
    paranoid: true
  }
);

module.exports = Song;
