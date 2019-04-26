const express = require("express");
const router = express.Router();
const passport = require("passport");
const logger = require("../lib/logger");

/* GET home page. */

router.get("/return",
  passport.authenticate("steam", { failureRedirect: "/" }),
  function(req, res) {
    logger.info("Authenticated user, redirecting");
    res.redirect("/");
  }
);

module.exports = router;
