'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("GamesToGameShelves", [
      {
        gameShelfId: 1,
        gameId: 1
      },
      {
        gameShelfId: 1,
        gameId: 2
      },
      {
        gameShelfId: 1,
        gameId: 3
      },
      {
        gameShelfId: 2,
        gameId: 4
      },
      {
        gameShelfId: 2,
        gameId: 5
      },
      {
        gameShelfId: 3,
        gameId: 6
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('GamesToGameShelves', null, {});
  }
};
