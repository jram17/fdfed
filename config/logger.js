const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');
const fs = require('fs');

const { combine, timestamp, json, colorize, printf } = winston.format;

const logDirectory = path.join('public', 'logs');

if (!fs.existsSync(logDirectory)) {
  // Create the directory if it doesn't exist.
  fs.mkdirSync(logDirectory, { recursive: true });
}

const consoleLogFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const dailyRotateFileTransport = new DailyRotateFile({
  filename: path.join(logDirectory, 'app-%DATE%.log'),
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '24h',
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), consoleLogFormat),
    }),
    dailyRotateFileTransport,
  ],
});

module.exports = logger;

