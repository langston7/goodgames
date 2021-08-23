const express = require('express');
const router = express.Router();
const csrf = require('csurf')
const csrfProtection = csrf({cookie: true})
const { User } = require('../db/models')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'a/A Express Skeleton Home' });
});

router.get('/login', csrfProtection, async (req, res) => {
  const user = await User.build()
  res.render('login', {csrfToken: req.csrfToken(), user})
});



module.exports = router;
