'use strict';
module.exports = (sequelize, DataTypes) => {
  const GameShelf = sequelize.define('GameShelf', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  GameShelf.associate = function(models) {
    GameShelf.belongsTo(models.User, {foreignKey: 'userId'});
    const columnMapping = {
      through: 'GamesToGameShelf',
      otherKey: 'gameId',
      foreignKey: 'gameShelfId'
    }
    GameShelf.belongsToMany(models.Game, columnMapping);
  };
  return GameShelf;
};
