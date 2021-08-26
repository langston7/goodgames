const express = require('express');
const router = express.Router();
const { Game, GameShelf } = require('../db/models')
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser } = require('../auth');
const bcrypt = require('bcryptjs')
const { csrfProtection, asyncHandler } = require('../utils');

router.get('/', asyncHandler(async (req, res) => {
    const games = await Game.findAll();
    res.render('games', { games });
}));

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const gameId = parseInt(req.params.id, 10);
    const game = await Game.findByPk(gameId);

    if (req.session.auth) {
        const { userId } = req.session.auth;
        const gameshelves = await GameShelf.findAll({where: {userId}});

        const shelves = await GameShelf.findAll({
            where: { userId }, 
            include: {
                model: Game,
            }
        });
    
        const ownedShelves = [];
      
        for (let i = 0; i < shelves.length; i++) {
            const shelf = shelves[i];
            const shelfName = shelf.name;
            const games = shelf.Games;
            // iterate through games array
            // find games that have an id that matches the gameId in this route
            // if there is a game in the games array that matches the gameId, then push the shelf name string to an array
            for (let j = 0; j < games.length; j++) {
                const game = games[j];
                if (game.id === gameId) {
                    ownedShelves.push(shelfName);
                    break;
                }
            }
        }

        return res.render('game-info', {game, gameshelves, ownedShelves});
    } else {
        return res.render('game-info', {game});
    }
    
}));


module.exports = router;
