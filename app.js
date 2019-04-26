const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;

const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const authRouter = require("./routes/auth");
const logoutRouter = require("./routes/logout");

const config = require("./config/environment");
const redis = require("./lib/redis-client").redisClient;


const app = express();
const nunjucks  = require("nunjucks");

// Passport session setup
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new SteamStrategy({
  returnURL: "http://localhost:3000/auth/steam/return",
  realm: "http://localhost:3000/",
  apiKey: config.STEAM_API_KEY,
  },
  function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user"s Steam profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Steam account with a user record in your database,
      // and return that user instead.
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

// view engine setup
app.set("views", path.join(__dirname, "views"));
nunjucks.configure("views", {
      autoescape: true,
      express   : app
});
app.set("view engine", "html");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: config.SESSION_SECRET,
	store: new RedisStore({ host: config.REDIS_HOST, port: config.REDIS_PORT, client: redis})
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/auth/steam", authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
