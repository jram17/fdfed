import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";
import fs from "fs";

const { combine, timestamp, json, colorize, printf } = format;

const logDirectory = path.join("public", "logs");
if (!fs.existsSync(logDirectory)) {
  // Create the directory if it doesn't exist.
  fs.mkdirSync(logDirectory, { recursive: true });
}

const consoleLogFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const dailyRotateFileTransport = new DailyRotateFile({
  filename: path.join(logDirectory, "app-%DATE%.log"), 
  datePattern: "YYYY-MM-DD-HH", 
  zippedArchive: true, 
  maxSize: "20m", 
  maxFiles: "24h", 
});

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), json()), 
  transports: [
    new transports.Console({
      format: combine(colorize(), consoleLogFormat),
    }),
    dailyRotateFileTransport, 
  ],
});
export default logger;
