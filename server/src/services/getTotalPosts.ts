import * as grpc from "@grpc/grpc-js";
import { IReq, IRes } from "../types/getTotalPosts";
import { fetchPosts } from "../utils/fetchData";
import { IPost } from "../types/getTotalPosts";
import createLogger from "../utils/logger/logger";

const logger = createLogger(__filename);

// rpc (similar to Express with Request and Response params)
const getTotalPosts = async (
  call: grpc.ServerUnaryCall<IReq, IRes>,
  callback: grpc.sendUnaryData<IRes>,
) => {
  if (call.request.TotalPosts === "get total cases") {
    const res = (await fetchPosts()) as IPost[];
    if (res !== undefined) {
      callback(null, {
        TotalPosts: res.length,
      });
      logger.log(
        "debug",
        `Request made successfully: get total cases | ${JSON.stringify(
          res.length,
        )} | ['totalCases', 'theHiveData', 'data']`,
      );
    }
  } else {
    callback(
      {
        code: grpc.status.INVALID_ARGUMENT,
        message:
          'Not reconize message! probably it\'s different from the expected message "get total cases"',
      },
      null,
    );
    logger.log(
      "error",
      "Not reconize message! probably it's different from the expected message 'get total cases'",
      {
        tags: ["totalCases", "theHiveData", "data"],
      },
    );
  }
};

export default getTotalPosts;
