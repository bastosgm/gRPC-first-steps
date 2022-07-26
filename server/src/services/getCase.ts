import * as grpc from '@grpc/grpc-js';
import { ICase } from 'types/getTotalCases';
import { fetchCases } from '../utils/fetchData';
import { IReq, IRes } from 'types/getCase';
import createLogger from '../utils/logger/logger';

const logger = createLogger(__filename);

const getCase = async (call: grpc.ServerUnaryCall<IReq, IRes>, callback: grpc.sendUnaryData<IRes>) => {
  if (!isNaN(+call.request.GetCase)) {
    const res = (await fetchCases()) as ICase[];
    if (res !== undefined) {
      callback(null, res[+call.request.GetCase - 1])
      logger.log('debug', `Request made successfully: get case | ${res[+call.request.GetCase - 1].title} | ['getCase', 'case', 'theHiveData', 'data']`, { tags: ['getCase', 'case', 'theHiveData', 'data'] })
    }
  }
  else {
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: "Invalid id! probably it isn't a number.",
    }, null)
    logger.log('error', `Invalid id! probably it isn't a number.`, { tags: ['getCase', 'case', 'theHiveData', 'data'] })
  }
}

export default getCase;