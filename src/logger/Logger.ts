import winston, {createLogger, format} from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

export const logFormat = format.printf(({level, message, timestamp, ...meta}) => {
    let metastr;
    if (Object.keys(meta).length > 0) {
        metastr = JSON.stringify(meta, null, 4);
    }
    return `${timestamp} - ${level} - ${message} ${metastr ?? ''}`;
});

export const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'HH:mm:ss:SSS'
        }),
        format.simple(),
        format.colorize(),
        logFormat
    ),
    transports: [
        new winston.transports.Console(),
    ]
});