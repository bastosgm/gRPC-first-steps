import buildDevLogger from './devLogger';
import buildProdLogger from './prodLogger';

const logger: Function = process.env['NODE_ENV'] === 'dev'
  ? buildDevLogger
  : buildProdLogger;

export default logger;