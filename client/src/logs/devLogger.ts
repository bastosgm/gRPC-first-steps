import winston, { format, createLogger, transports, config } from 'winston';

const customLevels = {
  // levels: {
  //   fatal: 1,
  //   error: 2,
  //   warn: 3,
  //   info: 4,
  //   debug: 5,
  //   trace: 6
  // },
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

function buildDevLogger() {
  const logFormat = format.printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} | [${level}]: ${stack || message}`;
  });
  return createLogger({
    // by default, if not mentioned, just consider info or higher and ignores any below, so, here it's defined for show debug level above.
    levels: config.syslog.levels,
    level: 'debug',
    format: format.combine(
      format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
      // To show trace stack of errors, it need to be actived
      format.errors({ stack: true }),
      format.colorize(),
      logFormat
    ),
    transports: [
      new transports.Console(),
    ],
  });
}

export default buildDevLogger;