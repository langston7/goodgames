'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Games', [
      {name: 'Xenoblade Chronicles 2', description:'Search for the ultimate paradise, Elysium, with your companion Pyra. Explore an endless ocean of clouds', developer:'Monolith Soft', releaseDate:'2017-12-01', imgURL:'https://upload.wikimedia.org/wikipedia/en/4/4a/Xenoblade_Chronicles_2.jpg'},
      {name: '', description:'', developer:'', releaseDate:'', imgURL:''},
      {name: '', description:'', developer:'', releaseDate:'', imgURL:''},
      {name: '', description:'', developer:'', releaseDate:'', imgURL:''},
      {name: '', description:'', developer:'', releaseDate:'', imgURL:''},
      {name: '', description:'', developer:'', releaseDate:'', imgURL:''},
      {name: '', description:'', developer:'', releaseDate:'', imgURL:''},
      {name: '', description:'', developer:'', releaseDate:'', imgURL:''},
      {name: '', description:'', developer:'', releaseDate:'', imgURL:''},
      {name: '', description:'', developer:'', releaseDate:'', imgURL:''},
      {name: '', description:'', developer:'', releaseDate:'', imgURL:''},
      {name: '', description:'', developer:'', releaseDate:'', imgURL:''},
      {name: '', description:'', developer:'', releaseDate:'', imgURL:''},
      {name: '', description:'', developer:'', releaseDate:'', imgURL:''},
      {name: '', description:'', developer:'', releaseDate:'', imgURL:''},
      {name: '', description:'', developer:'', releaseDate:'', imgURL:''},
      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Games', null, {});
    
  }
};
