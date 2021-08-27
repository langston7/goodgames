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
  res.render('review-add', { review, games });
}));


const reviewValidators = [
  check('content')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a review')
    .isLength({ min: 5 })
    .withMessage('Your Review must contain more than 5 characters'),
  check('rating')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a rating')
]


//post new
router.post('/games/:id(\\d+)/reviews', reviewValidators, asyncHandler(async (req, res) => {
  const { content, rating } = req.body
  const { userId } = req.session.auth;
  const gameId = parseInt(req.params.id, 10);
  const games = await Game.findByPk(gameId);
  let errors = [];
  const validatorErrors = validationResult(req);

  //find all reviews for that game
  const gameReviews = await Review.findAll({where: {gameId}});

  //if there are reviews for that game, and if one of the reviews has a userId of the current user, then add an error to the errors array with a message
  if (gameReviews.length) {
    const userReview = gameReviews.filter(review => review.userId == userId);
    if (userReview.length) {
      errors.push('You already submitted a review for this game');
    }
  }

  const review = await Review.build({ content, gameId, userId, rating })

  if(validatorErrors.isEmpty() && !errors.length){
    await review.save();

    const allReviews = await Review.findAll({ where: { gameId } });
    const ratingsArray = allReviews.map(review => review.rating);
    const total = ratingsArray.reduce((accum, rating) => accum + rating)
    const numberOfRatings = ratingsArray.length
    const averageRating = total/numberOfRatings;
    games.update({ rating: averageRating });

    return res.redirect(`/games/${gameId}`);
  }else {
    validatorErrors.array().forEach(error => errors.push(error.msg));
    // errors = validatorErrors.array().map((error) => error.msg);
    res.render('review-add',{
     games, errors, review}
    );
  }
}));

//edit
router.get('/games/:gameid(\\d+)/reviews/:reviewid(\\d+)/edit', asyncHandler(async (req, res) => {
  const reviewId = parseInt(req.params.reviewid, 10);
  const gameId = parseInt(req.params.gameid, 10);
  const review = await Review.findByPk(reviewId)
  const games = await Game.findByPk(gameId)
  res.render('edit-review', { review, games });
}));


router.post('/games/:gameid(\\d+)/reviews/:reviewid(\\d+)/edit', reviewValidators, asyncHandler(async (req, res, next) => {
  const { content, rating } = req.body
  const reviewId = parseInt(req.params.reviewid, 10);
  const gameId = parseInt(req.params.gameid, 10);
  const games = await Game.findByPk(gameId);
  let errors = [];
  const validatorErrors = validationResult(req);
  const review = await Review.findByPk(reviewId)

  if (validatorErrors.isEmpty()) {
    if (review) {
      await review.update({ content, rating });
      return res.redirect(`/games/${gameId}`);
    } else {
      const error = new Error('Review does not exist')
      error.status = 404
      next(error)
    }
  } else {
    errors = validatorErrors.array().map((error) => error.msg);
    res.render('edit-review', {
      games, errors, review
    }
    );
  }

}));



module.exports = router;
