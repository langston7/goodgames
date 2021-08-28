'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const reviewValues = [
      'Whenever someone wonders if video games can be art, there is no better example to show than this game.',
      'Cant wait to play it, It looks kinda fun!',
      'This was an amazing game, the free roam aspect was amazing',
      'I don’t think I’ve ever had a game make me want to go kick a kitten so much but also keep playing it.',
      'From start to finish it is a blast playing this game, it is addictive and the characters have wonderful writing.',
      'A very boring and annoying game. Absolutely not an interesting plot,',
      'After having passed the game several times, I can say that it is an excellent game.',
      'it has excellent mechanics, the enemies complement each other, the bosses evolve if you beat them several times, the story is good, and the soundtrack is very good',
      'Good graphics, excelent gameplay, and a verte good duration, very recommendable',
      'I would play it again I def recommend',
      'The game was kind of boring to me',
      'The artwork and gameplay was amazing'
  ];
    const values = [];
    let reviewNum = 1;
    let gameNum = 1;
    let userNum = 2;
    for (let i = 1; i <= 41; i++) {
      if (reviewNum >= reviewValues.length) {reviewNum = 1};
      if (gameNum >= 17) {gameNum = 1};
      if (userNum >= 7) {userNum = 2};
      let randomRating = Math.floor(Math.random() * (5 - 1) + 1);
      values.push({
        content:reviewValues[reviewNum],
        gameId:gameNum,
        userId:userNum,
        rating:randomRating
      });
      reviewNum++;
      gameNum++;
      userNum++;
    }
      return queryInterface.bulkInsert('Reviews', values , {});

  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {truncate: true, cascade: true, restartIdentity: true});
  }
};
