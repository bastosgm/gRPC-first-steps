import * as grpc from '@grpc/grpc-js';
import { IReq, IRes } from '../types/getTotalCases';
import { fetchCases } from '../utils/fetchData';
import { ICase } from '../types/getTotalCases';
import createLogger from '../utils/logger/logger';

const logger = createLogger(__filename);


// rpc (similar to Express with Request and Response params)
const getTotalCases = async (call: grpc.ServerUnaryCall<IReq, IRes>, callback: grpc.sendUnaryData<IRes>) => {
  if (call.request.TotalCases === "get total cases") {
    const res = (await fetchCases()) as ICase[];
    if (res !== undefined) {
      callback(null, {
        TotalCases: res.length
      })
      logger.log('debug', `Request made successfully: get total cases | ${JSON.stringify(res.length)} | ['totalCases', 'theHiveData', 'data']`)
    }
  } else {
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: 'Not reconize message! probably it\'s different from the expected message \"get total cases\"',
    }, null);
    logger.log(
      'error',
      'Not reconize message! probably it\'s different from the expected message \'get total cases\'',
      {
        tags: ['totalCases', 'theHiveData', 'data']
      })
  }
}

export default getTotalCases;