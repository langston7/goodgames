const express = require('express');
const router = express.Router();
const { Games } = require('../db/models')
const { check, validationResult } = require('express-validator');
const { loginUser, logoutUser } = require('../auth');
const bcrypt = require('bcryptjs')
const { csrfProtection, asyncHandler } = require('../utils');

router.get('/',asyncHandler(async (req, res) => {
    const games = await Games.findAll()
    res.render('games', {games});
}));

module.exports = router;