import TotalCasesService from "./client";
import { IGetCaseResponse, IGetTotalCasesResponse } from "types/client";
import logger from "./logs/logger";

// Requesting total cases
TotalCasesService["GetTotalCases"](
  { TotalCases: "get total cases" },
  (err: Error, response: IGetTotalCasesResponse) => {
    if (response !== undefined) {
      logger.log("info", JSON.stringify(response, null, "\t"));
    } else {
      logger.log("error", JSON.stringify(err, null, "\t"));
    }
  },
);

// // Requesting a especific case
TotalCasesService["GetCase"](
  { GetCase: "34" },
  (err: Error, response: IGetCaseResponse) => {
    if (response !== undefined) {
      logger.log("info", JSON.stringify(response, null, "\t"));
    } else {
      logger.log("error", JSON.stringify(err, null, "\t"));
    }
  },
);

// Requesting health
TotalCasesService["HealthCheck"](
  { HealthCheck: "health" },
  (err: Error, response: IGetCaseResponse) => {
    if (response !== undefined) {
      logger.log("info", JSON.stringify(response, null, "\t"));
    } else {
      logger.log("error", JSON.stringify(err, null, "\t"));
    }
  },
);
