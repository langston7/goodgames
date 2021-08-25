const express = require('express');
const router = express.Router();
const { Game, GameShelf, GamesToGameShelf } = require('../db/models')
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser, requireAuth } = require('../auth');
const bcrypt = require('bcryptjs')
const { csrfProtection, asyncHandler } = require('../utils');

router.get('/', requireAuth, asyncHandler(async (req,res) => {

  const {userId} = req.session.auth;
  const shelves = await GameShelf.findAll({where: {userId}, include: Game});

  const nestedGames = [];
  shelves.forEach(shelf => nestedGames.push(shelf.Games))
  const allUserGames = nestedGames.flat();

  res.render('gameshelves', {shelves, allUserGames})
}));

router.get('/:id(\\d+)', asyncHandler(async(req, res) => {
  res.send("asdf");
}));

router.post('/:id(\\d+)/games'), asyncHandler(async(req,res) => {
  const { shelfId, gameId } = req.body;
  await GamesToGameShelf.create({gameShelfId: shelfId, gameId: gameId});

})




module.exports = router;
