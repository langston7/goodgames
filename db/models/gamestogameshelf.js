'use strict';
module.exports = (sequelize, DataTypes) => {
  const GamesToGameShelf = sequelize.define('GamesToGameShelf', {
    gameShelfId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER
  }, {});
  GamesToGameShelf.associate = function(models) {
    // associations can be defined here
  };
  return GamesToGameShelf;
};