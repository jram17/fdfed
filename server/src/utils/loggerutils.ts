import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";
import fs from "fs";
import morgan from "morgan";
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
const morganFormat = ":method :url :status :response-time ms";

const urllog = morgan(morganFormat, {
    skip: function(req, res) {
        return res.statusCode >= 400
    },
    stream: {

        write: (message) => {
            const logObject = {
                method: message.split(" ")[0],
                url: message.split(" ")[1],
                status: message.split(" ")[2],
                responseTime: message.split(" ")[3],
            };
            logger.info(JSON.stringify(logObject));
        },
    },
})

const errorlog = morgan(morganFormat, {
    skip: function(req, res) {
        return res.statusCode < 400
    },
    stream: {

        write: (message) => {
            const logObject = {
                method: message.split(" ")[0],
                url: message.split(" ")[1],
                status: message.split(" ")[2],
                responseTime: message.split(" ")[3],
            };
            logger.error(JSON.stringify(logObject));
        },
    },
})

export { logger, urllog, errorlog }
