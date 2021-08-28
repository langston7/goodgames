'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'guest',
        hashedPassword: 'password',
        firstName: 'Guest',
        lastName: 'User',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {truncate: true, cascade: true, restartIdentity: true});
  }
};
