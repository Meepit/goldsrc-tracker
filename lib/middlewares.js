const logger = require("./logger");

module.exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { 
      logger.debug("User is authenticated, continuing");
      return next(); 
    }
    res.redirect("/");
}
