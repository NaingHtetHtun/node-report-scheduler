// utils/logger.js
  const { createLogger, format, transports } = require('winston');
  const path = require('path');
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join('logs', `${formattedDate}-log.log`) })
  ],
});

module.exports = logger;
