var express = require('express');
var router = express.Router();
const passport = require('passport');
const { gamesList } = require('../config/gamesList');
const { getAsync } = require('../lib/db');

/* GET home page. */

async function getPlayerCountsDb() {
    for await (const game of gamesList) {
        try {
            const count = await getAsync(`${game.id}`) || 'N/A';
            game.playerCount = count;
        } catch (err) {
            game.playerCount = -1
        }
    }
    return gamesList
}

router.get('/', passport.authenticate('steam'), async (req, res, next) => {
    const counts  = await getPlayerCountsDb();
    res.render('index', { title: 'Express', counts });
});

module.exports = router;
