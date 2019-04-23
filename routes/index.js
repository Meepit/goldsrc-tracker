var express = require('express');
var router = express.Router();
var axios  = require('axios');
const { gamesList } = require('../config/gamesList')

/* GET home page. */

async function getPlayerCounts() {
    const url = 'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid='
    for await (const game of gamesList) {
        try {
            const data = await axios.get(`${url}${game.id}`);
            console.log(data.data)
            game.playerCount = data.data.response.player_count;
        } catch (err) {
            game.playerCount = -1
        }
    }
    return gamesList
}

router.get('/', async (req, res, next) => {
    const counts  = await getPlayerCounts();
    res.render('index', { title: 'Express', counts });
});

module.exports = router;
