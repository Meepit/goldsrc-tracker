const { setAsync } = require('./db')
const axios  = require('axios');
const { gamesList } = require('../config/gamesList');

async function getPlayerCounts() {
    const url = 'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid='
    for await (const game of gamesList) {
        try {
            const data = await axios.get(`${url}${game.id}`);
            const playerCount = data.data.response.player_count;
            await setAsync(`${game.id}`, `${playerCount}`);
        } catch (err) {
            const playerCount = -1;
        }
    }
}

getPlayerCounts()
    .then(() => {
        process.exit();
    })
