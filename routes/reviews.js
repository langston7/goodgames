const express = require('express');
const router = express.Router();
const { Game, Review } = require('../db/models')
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser } = require('../auth');
const bcrypt = require('bcryptjs')
const { csrfProtection, asyncHandler } = require('../utils');

//get
router.get('/games/:id(\\d+)/reviews', asyncHandler(async (req, res) => {
    const reviews = await Review.findAll();
    const gameId = parseInt(req.params.id, 10);
    const games = await Game.findByPk(gameId)
    res.render('review-add', {reviews, games});
}));

//post new
router.post('/games/:id(\\d+)/reviews', asyncHandler(async (req, res) => {
  const reviews = await Review.findAll();
  const gameId = parseInt(req.params.id, 10);
  const games = await Game.findByPk(gameId)
  res.render('review-add', {reviews, games});
}));

//edit
router.get('/reviews/:id(\\d+)/edit', asyncHandler(async (req, res) => {
  const reviews = await Review.findAll();
  const gameId = parseInt(req.params.id, 10);
  const games = await Game.findByPk(gameId)
  res.render('review-add', {reviews, games});
}));


router.post('/reviews/:id(\\d+)/edit', asyncHandler(async (req, res) => {
  const review = Review.build();
  res.render('review-add', {review});
}));



module.exports = router;
