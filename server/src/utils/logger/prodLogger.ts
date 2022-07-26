import { format, createLogger, transports, config } from 'winston';
import formatISO from 'date-fns/formatISO';
import getParentFunctionName from '../getParentFunctionName';

function buildProdLogger() {

  return createLogger({
    levels: config.syslog.levels,
    level: 'warning',
    format: format.combine(
      format.errors({ stack: true }),
      format.printf(({ ...args }) => {
        args["module"] = getParentFunctionName();
        args["timestamp"] = formatISO(new Date())
        return JSON.stringify(args, null, "\t");
      })
    ),
    transports: [
      new transports.Console(),
      // new transports.File({ filename: 'src/logs/server.log' })
    ],
  });
}

export default buildProdLogger;