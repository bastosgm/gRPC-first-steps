import * as grpc from '@grpc/grpc-js';
import { IReq, IRes } from '../types/healthCheck';
import createLogger from '../utils/logger/logger';
import { fetchCases } from '../utils/fetchData';
import formatISO from 'date-fns/formatISO';
import { processTime } from '../utils/processTime';

const logger = createLogger(__filename);

const healthCheck = async (call: grpc.ServerUnaryCall<IReq, IRes>, callback: grpc.sendUnaryData<IRes>) => {
  if (call.request.HealthCheck === "health") {
    // Testing connection on API
    const timeInNano = await processTime();
    const nativeApi = await fetchCases();

    // Expected response
    const res = {
      status: nativeApi ? `RUNNING` : `UNAVAILABLE`,
      grpcCode: nativeApi ? `${grpc.status.OK}` : `${grpc.status.NOT_FOUND}`,
      processTime: `${(timeInNano * 1.0e-9).toFixed(2)}`,
      timestamp: formatISO(new Date()),
    }
    callback(null, res)
    logger.log('debug', `Request made successfully: health | ${JSON.stringify(res)} | ['Health', 'case', 'theHiveData', 'data']`)
  } else {
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      message: "HealthCheck",
    }, null)
    logger.log('error', `Invalid message! probably it's a typo which does not match with \'{HealthCheck: health}\'.`, { tags: ['getCase', 'case', 'theHiveData', 'data'] })
  }
}

export default healthCheck;