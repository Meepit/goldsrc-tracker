require('dotenv').config();
const config = require('./environment')

module.exports = {
  "development": {
    username: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_NAME,
    host: config.DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    username: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_NAME,
    host: config.DB_HOST,
    "dialect": "postgres"
  },
  "production": {
    username: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_NAME,
    host: config.DB_HOST,
    "dialect": "postgres"
  }
}