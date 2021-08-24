const express = require('express');
const router = express.Router();
const { User } = require('../db/models')
const { check, validationResult } = require('express-validator');
const { loginUser } = require('../auth');
const bcrypt = require('bcryptjs')
const { csrfProtection, asyncHandler } = require('../utils');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'a/A Express Skeleton Home' });
});

router.get('/login', csrfProtection, asyncHandler(async (req, res) => {
  const user = await User.build()
  console.log(loginUser);
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
  let errors = []
  const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const user = await User.findOne({ where: {username} })
      if(user){
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword)
        if(passwordMatch){
          loginUser(req, res, user)
          return res.redirect('/')
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
    await User.create({username, firstName, lastName, hashedPassword});
    return res.redirect('/');
  } else {
    errors = validatorErrors.array().map((error) => error.msg);
  }
  res.render('signup',{
    user,
    errors,
    csrfToken: req.csrfToken()
  });
}));


module.exports = router;
