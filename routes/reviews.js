const express = require('express');
const router = express.Router();
const { Review } = require('../db/models')
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser } = require('../auth');
const bcrypt = require('bcryptjs')
const { csrfProtection, asyncHandler } = require('../utils');

//get
router.get('/games/:id(\\d+)/reviews/new', asyncHandler(async (req, res) => {
    const reviews = await Review.findAll();
    res.render('review-add', {reviews});
}));

//post new
router.post('/games/:id(\\d+)/reviews', asyncHandler(async (req, res) => {
  const review = Review.build();
  res.render('review-add', {review});
}));

//edit
router.get('/reviews/:id(\\d+)/edit', asyncHandler(async (req, res) => {
  const review = Review.build();
  res.render('review-add', {review});
}));


router.post('/reviews/:id(\\d+)/edit', asyncHandler(async (req, res) => {
  const review = Review.build();
  res.render('review-add', {review});
}));



module.exports = router;
