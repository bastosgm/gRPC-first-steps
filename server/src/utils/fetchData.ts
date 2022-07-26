import { ICase } from 'types/getTotalCases';
import fetch from 'cross-fetch';
import createLogger from './logger/logger';

const logger = createLogger(__filename);

export const fetchCases = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const json: ICase[] = await response.json();
    if (json.length > 0) return json;
  } catch (err) {
    logger.log('error', 'Native API server did not respond.', { tags: ['fetch', 'theHiveData', 'data', 'native'] })
  }
}