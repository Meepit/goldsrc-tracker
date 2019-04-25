const { setAsync } = require('./redis-client')
const axios  = require('axios');
const { gamesList } = require('../config/gamesList');
const logger = require('./logger');

async function getPlayerCounts() {
    const url = 'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid='
    for await (const game of gamesList) {
        try {
            logger.info(`Getting player count for: ${game.id}`);
            const data = await axios.get(`${url}${game.id}`);
            const playerCount = data.data.response.player_count;
            await setAsync(`${game.id}`, `${playerCount}`);
            logger.info(`Updating cache`);
        } catch (err) {
            logger.error(`Failed to get count: ${err}`);
            const playerCount = -1;
        }
    }
}

getPlayerCounts()
    .then(() => {
        logger.info('Exiting')
        process.exit();
    })
