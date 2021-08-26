const express = require('express');
const router = express.Router();
const { Game, GameShelf, GamesToGameShelf } = require('../db/models')
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser, requireAuth } = require('../auth');
const bcrypt = require('bcryptjs')
const { csrfProtection, asyncHandler } = require('../utils');
const db = require('../db/models');

router.use(requireAuth);

router.get('/', asyncHandler(async (req,res) => {

  const {userId} = req.session.auth;
  const shelves = await GameShelf.findAll({where: {userId}, include: Game});

  const nestedGames = [];
  shelves.forEach(shelf => nestedGames.push(shelf.Games))
  const allUserGames = nestedGames.flat();

  res.render('gameshelves', {shelves, allUserGames})
}));

router.get('/:id(\\d+)', asyncHandler(async(req, res, next) => {
  const { userId } = req.session.auth;
  const shelfId = req.params.id;

  const shelves = await GameShelf.findAll({where: {userId}, include: Game});
  const shelf = await GameShelf.findOne({where: {id: shelfId}, include: Game})

  if (shelf.userId === userId) {
    const shelfGames = shelf.Games;
    res.render('gameshelves', { shelves, allUserGames: shelfGames })
  } else {
    const err = new Error('Unauthorized request');
    err.status = 403;
    next(err);
  }

}));

router.post('/:id(\\d+)/games', asyncHandler(async(req,res) => {
  const { shelfId, gameId } = req.body;

  const { userId } =  req.session.auth;

  const shelf = await GameShelf.findByPk(shelfId, {
    include: {
      model: Game,
    }
  });

  const shelves = await GameShelf.findAll({
    where: { userId },
    include: {
      model: Game,
    }
  });

  // console.log(shelves);
  // console.log(JSON.stringify(shelves[0].Games, null, 2));
  let hasGame = false;

  shelf.Games.forEach(game => {
    console.log(gameId, game);
    if (game.id === gameId) {
      hasGame = true;
    }
  })

  if(!hasGame) {
    const newGame = await GamesToGameShelf.create({gameShelfId: shelfId, gameId: gameId});
    res.json({newGame});
  } else {
    res.json({})
  }

}));


router.post('/new', asyncHandler(async(req, res) => {
  const { shelfName } = req.body;
  const { userId } = req.session.auth;

  await GameShelf.create({name: shelfName, userId: userId});
  res.json();
}));



module.exports = router;
