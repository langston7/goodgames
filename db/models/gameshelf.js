'use strict';
module.exports = (sequelize, DataTypes) => {
  const GameShelf = sequelize.define('GameShelf', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  GameShelf.associate = function(models) {
    // associations can be defined here
  };
  return GameShelf;
};