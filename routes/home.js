const express = require('express');
const router = express.Router();
const { User, GameShelf, Game } = require('../db/models')
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser } = require('../auth');
const bcrypt = require('bcryptjs')
const { csrfProtection, asyncHandler } = require('../utils');

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  const { userId } = req.session.auth;
  min = Math.ceil(1);
  max = Math.floor(17);
  const randomGameId = Math.floor(Math.random() * (max - min) + min);
  const game = await Game.findByPk(randomGameId);

  const currShelf = await GameShelf.findOne({where: {name:"Currently Playing", userId:userId}, include: {model:Game}})
  const currImgURL = currShelf.Games[0].imgURL;
  const currGameId = currShelf.Games[0].id;

  res.render('home', { title: 'a/A Express Skeleton Home', game, currImgURL, currGameId });
}));

router.get('/login', csrfProtection, asyncHandler(async (req, res) => {
  const user = await User.build()
  res.render('login', {csrfToken: req.csrfToken(), user})
}));

router.get('/signup', csrfProtection, asyncHandler(async (req, res) => {
  const user = await User.build();
  res.render('signup', {csrfToken: req.csrfToken(), user});
}));

const loginValidators = [
  check('username')
    .exists({checkFalsy: true})
    .withMessage('Please provide a User Name'),
  check('password')
    .exists({checkFalsy: true})
    .withMessage('Please provide a Password')
]

router.post('/login', csrfProtection, loginValidators, asyncHandler(async (req,res) =>{
  const { username } = req.body;
  const { password } = req.body;
  const user = await User.build()
  user.username = username;
  let errors = [];
  const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const user = await User.findOne({ where: {username} })
      if(user){
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword)
        if(passwordMatch){
          loginUser(req, res, user);
          return req.session.save(error => {
            if(error){
              next(error);
            }else{
              return res.redirect('/');
            }
          });
        }
      }
      errors.push('login failed')
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }
    res.render('login',{
    user,
    errors,
    csrfToken: req.csrfToken()
  })
}));


const signUpValidators = [
  check('username')
    .exists({checkFalsy: true})
    .withMessage('Please provide a User Name')
    .custom(async(value) => {
      const user = await User.findOne({where: {username:value}});
      if(user){
        return Promise.reject('Username is already in use.');
      }
    }),
  check('firstName')
    .exists({checkFalsy: true})
    .withMessage('Please provide a First Name'),
  check('lastName')
    .exists({checkFalsy: true})
    .withMessage('Please provide a Last Name'),
  check('password')
    .exists({checkFalsy: true})
    .withMessage('Please provide a Password')
    .isLength({ max: 50 })
    .withMessage('Password must not be more than 50 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")')
]

router.post('/signup', csrfProtection, signUpValidators, asyncHandler(async (req,res) => {

  const {
    username,
    firstName,
    lastName,
    password
  } = req.body;
  const user = await User.build({
    username, firstName, lastName
  });

  let errors = [];
  const validatorErrors = validationResult(req);

  if(validatorErrors.isEmpty()){
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({username, firstName, lastName, hashedPassword});

    // Create 3 gameshelves
    await GameShelf.create({name:'Played', userId:newUser.id,})
    await GameShelf.create({name:'Currently Playing', userId:newUser.id,})
    await GameShelf.create({name:'Want to Play', userId:newUser.id,})

    return res.redirect('/login');
  } else {
    errors = validatorErrors.array().map((error) => error.msg);
  }
  res.render('signup',{
    user,
    errors,
    csrfToken: req.csrfToken()
  });
}));

router.post('/logout', (req, res, next) => {
  logoutUser(req);
  return req.session.save(error => {
    if(error){
      next(error);
    }else{
      return res.redirect('/');
    }
  });
});

router.post('/guest', asyncHandler(async(req, res) => {
  const guestUser = await User.findOne({
    where: { username: 'guest' }
  });
  loginUser(req, res, guestUser);
  return req.session.save(error => {
    if(error){
      next(error);
    }else{
      return res.redirect('/');
    }
  });
}))

module.exports = router;
