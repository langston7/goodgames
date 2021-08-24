'use strict';
module.exports = (sequelize, DataTypes) => {
  const Games = sequelize.define('Games', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    developer: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    imgURL: DataTypes.STRING
  }, {});
  Games.associate = function(models) {
    // associations can be defined here
  };
  return Games;
};