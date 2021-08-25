const express = require('express');
const router = express.Router();
const { Game, GameShelf } = require('../db/models')
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser } = require('../auth');
const bcrypt = require('bcryptjs')
const { csrfProtection, asyncHandler } = require('../utils');

router.get('/', asyncHandler(async (req, res) => {
    const games = await Game.findAll();
    res.render('games', {games});
}));

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const gameId = parseInt(req.params.id, 10);
    const game = await Game.findByPk(gameId);
    const { userId } = req.session.auth;
    const gameshelves = await GameShelf.findAll({where: {userId}});
    res.render('game-info', {game, gameshelves});
}));


module.exports = router;
