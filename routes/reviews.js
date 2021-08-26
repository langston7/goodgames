const express = require('express');
const router = express.Router();
const { Game, Review } = require('../db/models')
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser } = require('../auth');
const bcrypt = require('bcryptjs')
const { csrfProtection, asyncHandler } = require('../utils');

//get
router.get('/games/:id(\\d+)/reviews/new', asyncHandler(async (req, res) => {
    const review = await Review.findAll();
    const gameId = parseInt(req.params.id, 10);
    const games = await Game.findByPk(gameId)
    res.render('review-add', {review, games});
}));


const reviewValidators = [
  check('content')
    .exists({checkFalsy: true})
    .withMessage('Please provide a review')
    .isLength({ min: 5})
    .withMessage('review must contain more than 5 characters')
]


//post new
router.post('/games/:id(\\d+)/reviews',reviewValidators, asyncHandler(async (req, res) => {
  const { content, rating } = req.body
  const  { userId } = req.session.auth;
  const gameId = parseInt(req.params.id, 10);
  const games = await Game.findByPk(gameId);
  console.log(rating)
  let errors = [];
  const validatorErrors = validationResult(req);
  const review = await Review.build({ content, gameId, userId, rating })

  if(validatorErrors.isEmpty()){
    await review.save()
    return res.redirect(`/games/${gameId}`);
  }else {
    errors = validatorErrors.array().map((error) => error.msg);
    res.render('review-add',{
     games, errors, review}
    );
  }
}));

//edit
router.get('/reviews/:id(\\d+)/edit', asyncHandler(async (req, res) => {
  const reviewId = parseInt(req.params.id, 10);
  const review = await Review.findByPk();
  const gameId = parseInt(req.params.id, 10);
  const games = await Game.findByPk(gameId)
  res.render('review-add', {review, games});
}));


router.post('/reviews/:id(\\d+)/edit', asyncHandler(async (req, res) => {
  const review = Review.build();
  res.render('review-add', {review});
}));



module.exports = router;
