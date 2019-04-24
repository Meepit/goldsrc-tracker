var express = require('express');
var router = express.Router();
const passport = require('passport');
const { gamesList } = require('../config/gamesList');
const { getAsync } = require('../lib/db');

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

router.get('/', async (req, res, next) => {
    res.locals.user = req.user || null;
    const counts  = await getPlayerCountsDb();
    res.render('index', { title: 'Express', counts });
});

module.exports = router;
