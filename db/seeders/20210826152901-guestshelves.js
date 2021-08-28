'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("GameShelves", [
      {
        name: "Played",
        userId: 1
      },
      {
        name: "Currently Playing",
        userId: 1
      },
      {
        name: "Want To Play",
        userId: 1
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('GameShelves', null, {truncate: true, cascade: true, restartIdentity: true});
  }
};
