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
    Game.hasMany(models.Review, {foreignKey: "gameId"});
    const columnMapping = {
      through: 'GamesToGameShelf',
      otherKey: 'gameShelfId',
      foreignKey: 'gameId'
    }
    Game.belongsToMany(models.GameShelf, columnMapping)
  };
  return Game;
};
