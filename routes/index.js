const express = require("express");
const router = express.Router();
const { gamesList } = require("../config/gamesList");
const { getAsync } = require("../lib/redis-client");
const ensureAuthenticated = require("../lib/middlewares").ensureAuthenticated;
const db = require("../models/index");
const { getNonEmptyValues } = require("../lib/utils");
const logger = require("../lib/logger");

async function getPlayerCountsDb() {
    for await (const game of gamesList) {
        try {
            const count = await getAsync(`${game.id}`) || "N/A";
            game.playerCount = count;
        } catch (err) {
            game.playerCount = -1
        }
    }
    return gamesList
}


async function indexGetController(req, res, next) {
    res.locals.user = req.user || null;
    const counts  = await getPlayerCountsDb();
    res.render("index", { counts, user: req.user });
}

async function indexPostController(req, res, next) {
    const alertArr = getNonEmptyValues(req.body);
    for await (const gameId of alertArr) {
        logger.info(`Creating alert for game: ${gameId} for user: ${req.user.steamid}`);
        try {
            let alert = await db.Alert.findOne({
                where: {
                    gameid: parseInt(gameId, 10),
                    UserSteamid: req.user.steamid
                }
            });
            if (!alert) {
                alert = await db.Alert.create({
                    gameid: parseInt(gameId, 10),
                    threshold: parseInt(req.body[gameId], 10),
                    UserSteamid: req.user.steamid
                });
            } else {
                logger.info("Alert already exists, updating threshold");
                alert.threshold = parseInt(req.body[gameId], 10);
                alert.save();
            }
        } catch (err) {
            logger.error(`Failed to create alert: ${err}`);
            // Add flash msg here
        }
    }
    return res.redirect("/");
}

router.get("/", indexGetController);
router.post("/", ensureAuthenticated, indexPostController);

module.exports = router;
