const express = require('express');
const router = express.Router();
const { Game, Review } = require('../db/models')
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser } = require('../auth');
const bcrypt = require('bcryptjs')
const { csrfProtection, asyncHandler } = require('../utils');

//get
router.get('/games/:id(\\d+)/reviews/new', asyncHandler(async (req, res) => {
    const review = await Review.build();
    const gameId = parseInt(req.params.id, 10);
    const games = await Game.findByPk(gameId)
    res.render('review-add', {review, games});
}));


const reviewValidators = [
  check('content')
    .exists({checkFalsy: true})
    .withMessage('Please provide a review')
    .isLength({ min: 5})
    .withMessage('review must contain more than 5 characters'),
  check('rating')
    .exists({checkFalsy: true})
    .withMessage('Please provide a rating')
]


//post new
router.post('/games/:id(\\d+)/reviews',reviewValidators, asyncHandler(async (req, res) => {
  const { content, rating } = req.body
  const  { userId } = req.session.auth;
  const gameId = parseInt(req.params.id, 10);
  const games = await Game.findByPk(gameId);
  let errors = [];
  const validatorErrors = validationResult(req);
  const review = await Review.build({ content, gameId, userId, rating })

  if(validatorErrors.isEmpty()){
    await review.save();

    const allReviews = await Review.findAll({where: {gameId}});
    const ratingsArray = allReviews.map(review => review.rating);
    const averageRating = (ratingsArray.reduce((accum, rating) => accum + rating))/ratingsArray.length;
    games.update({ rating: averageRating });

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
  const review = await Review.findAll();
  const gameId = parseInt(req.params.id, 10);
  const games = await Game.findByPk(gameId)
  const h1ReviewHeader = document.getElementsByClassName('review-welcome')
  h1ReviewHeader.innerText = 'Edit your review'
  res.render('review-add', {review, games});
}));


router.post('/reviews/:id(\\d+)/edit',reviewValidators, asyncHandler(async (req, res) => {
  const { content, rating } = req.body
  const  { userId } = req.session.auth;
  const gameId = parseInt(req.params.id, 10);
  const games = await Game.findByPk(gameId);
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



module.exports = router;
