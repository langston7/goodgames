const express = require('express');
const router = express.Router();
const { User } = require('../db/models')
const { check, validationResult } = require('express-validator');
const loginUser = require('../auth');
const bcrypt = require('bcryptjs')
const { csrfProtection, asyncHandler } = require('../utils');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'a/A Express Skeleton Home' });
});

router.get('/login', csrfProtection, (async (req, res) => {
  const user = await User.build()
  res.render('login', {csrfToken: req.csrfToken(), user})
}));

const loginValidators = [
  check('username')
    .exists({checkFalsy: true})
    .withMessage('Please provide a User Name'),
  check('password')
    .exists({checkFalsy: true})
    .withMessage('Please provide a Password')
]

router.post('/login', csrfProtection, loginValidators, asyncHandler, (async (req,res) =>{
  const { username } = req.body;
  const { password } = req.body;
  const user = await User.build()
  user.username =  username 
  const errors = []
  const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        const user = await User.findone({ where: {username} })
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



module.exports = router;
