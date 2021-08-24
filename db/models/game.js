'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    developer: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    imgURL: DataTypes.STRING
  }, {});
  Game.associate = function(models) {
    // associations can be defined here
  };
  return Game;
};
