import TotalPostsService from "./client";
import { IGetPostResponse, IGetTotalPostsResponse } from "types/client";
import logger from "./logs/logger";

// Requesting total cases
TotalPostsService["GetTotalPosts"](
  { TotalPosts: "get total posts" },
  (err: Error, response: IGetTotalPostsResponse) => {
    if (response !== undefined) {
      logger.log("info", JSON.stringify(response, null, "\t"));
    } else {
      logger.log("error", JSON.stringify(err, null, "\t"));
    }
  },
);

// // Requesting a especific case
TotalPostsService["GetPost"](
  { GetPost: "34" },
  (err: Error, response: IGetPostResponse) => {
    if (response !== undefined) {
      logger.log("info", JSON.stringify(response, null, "\t"));
    } else {
      logger.log("error", JSON.stringify(err, null, "\t"));
    }
  },
);

// Requesting health
TotalPostsService["HealthCheck"](
  { HealthCheck: "health" },
  (err: Error, response: IGetPostResponse) => {
    if (response !== undefined) {
      logger.log("info", JSON.stringify(response, null, "\t"));
    } else {
      logger.log("error", JSON.stringify(err, null, "\t"));
    }
  },
);
