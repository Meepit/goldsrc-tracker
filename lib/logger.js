const winston = require('winston');
const { format } = winston;

const logger = winston.createLogger({
  level: 'debug',
  colorize: 'true',
  handleExceptions: true,
  format: format.combine(
    format.timestamp(),
    format.printf(i => `${i.timestamp} | ${i.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: '../logfile.log' })
  ]
});

module.exports = logger;