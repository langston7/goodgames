'use strict';
const bcrypt = require('bcryptjs')
const faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const values = []
    for (let i = 0; i <= 20; i++) {
      values.push({
        username: faker.name.findName(),
        hashedPassword: bcrypt.hashSync(`password${i}`),
        firstName: 'Guest',
        lastName: 'User'
      })
    }
    return queryInterface.bulkInsert('Users', values, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('GamesToGameShelves', null, {truncate: true, cascade: true, restartIdentity: true});
    await queryInterface.bulkDelete('GameShelves', null, {truncate: true, cascade: true, restartIdentity: true});
    return queryInterface.bulkDelete('Users', null, {truncate: true, cascade: true, restartIdentity: true});
  }
};
