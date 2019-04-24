const express = require('express');
const router = express.Router();
const logger = require('../lib/logger');
const passport = require('passport');

/* GET users listing. */
router.get('/', passport.authenticate('steam', { failureRedirect: '/' }), function(req, res, next) {
  logger.info('In login controller');
});

module.exports = router;
