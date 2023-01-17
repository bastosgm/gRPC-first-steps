import * as grpc from "@grpc/grpc-js";
import { IPost } from "../types/getTotalPosts";
import { fetchPosts } from "../utils/fetchData";
import { IReq, IRes } from "types/getPost";
import createLogger from "../utils/logger/logger";

const logger = createLogger(__filename);

const getPost = async (
  call: grpc.ServerUnaryCall<IReq, IRes>,
  callback: grpc.sendUnaryData<IRes>,
) => {
  if (!isNaN(+call.request.GetPost)) {
    const res = (await fetchPosts()) as IPost[];
    if (res !== undefined) {
      callback(null, res[+call.request.GetPost - 1]);
      logger.log(
        "debug",
        `Request made successfully: get Post | ${
          res[+call.request.GetPost - 1].title
        } | ['getPost', 'post', 'data']`,
        { tags: ["getPost", "post", "data"] },
      );
    }
  } else {
    callback(
      {
        code: grpc.status.INVALID_ARGUMENT,
        message: "Invalid id! probably it isn't a number.",
      },
      null,
    );
    logger.log("error", `Invalid id! probably it isn't a number.`, {
      tags: ["getPost", "post", "data"],
    });
  }
};

export default getPost;
