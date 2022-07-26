import winston, { format, createLogger, transports, config } from 'winston';

// Customized colors
const customLevels = {
  colors: {
    emerg: 'red',
    alert: 'red',
    crit: 'red',
    error: 'red',
    warning: 'yellow',
    notice: 'green',
    info: 'green',
    debug: 'blue',
  }
}
winston.addColors(customLevels.colors)

// DevLogger
function buildDevLogger() {
  return createLogger({
    levels: config.syslog.levels,
    level: 'debug',
    format: format.combine(
      format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
      format.errors({ stack: true }),
      format.colorize(),
      format.printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} | [${level}]: ${stack || message}`;
      })
    ),
    transports: [
      new transports.Console(),
    ],
  });
}

export default buildDevLogger;