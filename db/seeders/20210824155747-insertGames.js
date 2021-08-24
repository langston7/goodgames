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
      {name: 'Red Dead Redemption 2', description:'The game is the third entry in the Red Dead series and is a prequel to the 2010 game Red Dead Redemption. The story is set in 1899 in a fictionalized representation of the Western, Midwestern, and Southern United States and follows outlaw Arthur Morgan, a member of the Van der Linde gang. Arthur must deal with the decline of the Wild West whilst attempting to survive against government forces, rival gangs, and other adversaries.', developer:'Rockstar Studios', releaseDate:'2019-11-5', imgURL:'https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg'},
      {name: 'Super Smash Bros. Ultimate', description:' The game follows the series traditional style of gameplay: controlling one of the various characters, players must use differing attacks to weaken their opponents and knock them out of an arena.', developer:'Bandai Namco Studios', releaseDate:'2018-12-07', imgURL:'https://upload.wikimedia.org/wikipedia/en/5/50/Super_Smash_Bros._Ultimate.jpg'},
      {name: 'Street Fighter 30th Anniversary Collection', description:'Street Fighter 30th Anniversary Collection is a compilation of competitive fighting games from the Street Fighter series developed by Digital Eclipse and published by Capcom.', developer:'Digital Eclipse', releaseDate:'2018-05-29', imgURL:'https://upload.wikimedia.org/wikipedia/en/f/f5/Street_Fighter_30th_Anniversary_Collection.png'},
      {name: 'Hades', description:'Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler.', developer:'Supergiant Games', releaseDate:'2020-09-17', imgURL:'https://upload.wikimedia.org/wikipedia/en/c/cc/Hades_cover_art.jpg'},
      {name: 'The Legend of Zelda: Breath of the Wild', description:'Breath of the Wild is part of The Legend of Zelda franchise and is set at the end of the Zelda timeline. The player controls Link, who awakens from a hundred-year slumber to defeat Calamity Ganon and save the kingdom of Hyrule.', developer:'Nintendo EPD', releaseDate:'2017-03-03', imgURL:'https://upload.wikimedia.org/wikipedia/en/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg'},
      {name: 'League of Legends', description:'Inspired by Defense of the Ancients, a custom map for Warcraft III, Riots founders sought to develop a stand-alone game in the same genre.', developer:'Riot Games', releaseDate:'2009-10-27', imgURL:'https://upload.wikimedia.org/wikipedia/commons/d/d8/League_of_Legends_2019_vector.svg'},
      {name: 'Cyberpunk 2077', description:'Cyberpunk 2077 is an action role-playing video game developed and published by CD Projekt. The story takes place in Night City, an open world set in the Cyberpunk universe. Players assume the first-person perspective of a customisable mercenary known as V, who can acquire skills in hacking and machinery with options for melee and ranged combat.', developer:'CD Projekt Red', releaseDate:'2020-12-10', imgURL:'https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg'},
      {name: 'Final Fantasy VII', description:'AVALANCHE destroys a Shinra Mako reactor in Midgar; an attack on another reactor goes wrong, and Cloud falls into the city slums. There, he meets Aerith and protects her from Shinra.', developer:'Square', releaseDate:'1997-01-31', imgURL:'https://upload.wikimedia.org/wikipedia/en/c/c2/Final_Fantasy_VII_Box_Art.jpg'},
      {name: 'Ark: Survival Evolved', description:'Ark: Survival Evolved (stylized as ΛRK) is a 2017 action-adventure survival video game developed by Studio Wildcard, in collaboration with Instinct Games, Efecto Studios, and Virtual Basement. In the game, players must survive being stranded on an island filled with roaming dinosaurs and other prehistoric animals, natural hazards, and potentially hostile human players.', developer:'Studio Wildcard', releaseDate:'2017-07-29', imgURL:'https://upload.wikimedia.org/wikipedia/en/2/2b/ArkSurvivalEvolved.png'},
      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Games', null, {});
    
  }
};
