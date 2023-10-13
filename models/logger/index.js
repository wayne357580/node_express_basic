const morgan = require('morgan');
const winston = require('winston');
require('winston-daily-rotate-file');
const { createLogger, format, transports } = winston
const { combine, timestamp, printf, colorize, align, errors, json } = format;

const logFolder = process.env.LOG_FOLDER || './logs'
const fileRotateTransport = new winston.transports.DailyRotateFile({
    filename: `${logFolder}/combined-%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    maxFiles: process.env.LOG_MAX_FILES || '14d',
    maxSize: process.env.LOG_MAX_SIZE || '20m'
});

// Common logger
const loggerConfig = {
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        errors({ stack: true }),
        //colorize({ all: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SS' }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [new transports.Console(), fileRotateTransport]
}

// HTTP request logger
const morganLoggerConfig = winston.createLogger({
    level: 'http',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SS' }),
        align(),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [new winston.transports.Console(), fileRotateTransport],
})

module.exports = {
    logger: createLogger(loggerConfig),
    morganLogger: morgan(
        'short', {
        stream: {
            write: (message) => morganLoggerConfig.http(message.trim())
        }
    })
};