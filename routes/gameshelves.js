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
  const shelves = await GameShelf.findAll({where: {userId}, include: Game, order: [['id']]});

  const nestedGames = [];
  shelves.forEach(shelf => nestedGames.push(shelf.Games))
  const allUserGames = nestedGames.flat();

  res.render('gameshelves', {shelves, allUserGames})
}));

router.get('/:id(\\d+)', requireAuth, asyncHandler(async(req, res, next) => {
  const { userId } = req.session.auth;
  const shelfId = req.params.id;

  const shelves = await GameShelf.findAll({where: {userId}, include: Game, order: [['id']]});
  const shelf = await GameShelf.findOne({where: {id: shelfId}, include: Game})

  // Error handling:
  // 1st condition - trying to go to a shelf that doesn't exist
  // 2nd condition - trying to go to a shelf owned by another user
  // 3rd condition - trying to go to an existing shelf the current user owns
  if (!shelf) {
    const error = new Error('How\'d you get here? This page doesn\'t exist.');
    error.status = 404;
    next(error);
  } else if (shelf.userId !== userId){
    const err = new Error('Unauthorized request');
    err.status = 403;
    next(err);
  } else {
    const nestedGames = [];
    shelves.forEach(shelf => nestedGames.push(shelf.Games));
    const allUserGames = nestedGames.flat();
    const shelfGames = shelf.Games;
    res.render('gameshelf-info', { shelves, allUserGames, shelfGames });
  }
}));

router.delete('/:id(\\d+)', requireAuth, asyncHandler(async(req, res) => {
  const shelfId = req.params.id;
  const shelfToDestroy = await GameShelf.findByPk(shelfId);

  if (shelfToDestroy) {
    const gamesInShelf = await GamesToGameShelf.findAll({where: {gameShelfId: shelfId}});
    gamesInShelf.forEach(async(game) => await game.destroy());
    await shelfToDestroy.destroy();
    return res.json({});
  } else {
    const error = new Error('Shelf does not exist');
    error.status = 404;
    next(error);
  }
}));

router.delete('/:shelfId(\\d+)/games/:gameId(\\d+)', asyncHandler(async(req, res, next) => {
  const shelfId = req.params.shelfId;
  const gameId = req.params.gameId;
  const recordToDestroy = await GamesToGameShelf.findOne({
    where: {gameShelfId: shelfId, gameId}
  });

  if (recordToDestroy) {
    await recordToDestroy.destroy();
    return res.json({});
  } else {
    const error = new Error('Record does not exist on that shelf');
    error.status = 404;
    next(error);
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

  let hasGame = false;

  shelf.Games.forEach(game => {
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

  const newShelf = await GameShelf.create({name: shelfName, userId: userId});

  const newShelfId = newShelf.id;
  res.json({newShelfId});
}));



module.exports = router;
