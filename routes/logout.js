const express = require('express');
const router = express.Router();
const logger = require('../lib/logger');
const passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
    logger.info('Logging out user');
    req.logout();
    res.redirect('/');
});

module.exports = router;
