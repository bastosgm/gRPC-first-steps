// Libs
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import getTotalPosts from "./services/getTotalPosts";
import getPost from "./services/getPost";
import healthCheck from "./services/healthCheck";
import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import createLogger from "./utils/logger/logger";

const logger = createLogger(__filename);

// Data
const PROTO_FILE = process.env["PROTO_FILE"]!;
const HOST = process.env["HOST"]!;

// Main
(async function main() {
  const server = new grpc.Server();

  // Loading the proto file
  const proto = protoLoader.loadSync(PROTO_FILE);

  // Defining the package (cases)
  const { posts }: any = grpc.loadPackageDefinition(proto);

  // Adding service. Both key and value need to have the same structure.
  server.addService(posts.TotalPostsService.service, {
    GetTotalPosts: getTotalPosts,
    GetPost: getPost,
    HealthCheck: healthCheck,
  });

  // keyPairs
  const keyPairs: grpc.KeyCertPair[] = [
    {
      cert_chain: fs.readFileSync(path.join(__dirname, "../../ssl/server.crt")),
      private_key: fs.readFileSync(
        path.join(__dirname, "../../ssl/server.key"),
      ),
    },
  ];

  // Credentials
  // const credentials = grpc.ServerCredentials.createInsecure();
  const credentials = grpc.ServerCredentials.createSsl(
    fs.readFileSync(path.join(__dirname, "../../ssl/rootCA.crt")),
    keyPairs,
    false,
  );

  // Server
  server.bindAsync(HOST, credentials, (_err, port) => {
    try {
      server.start();
      logger.log("info", `Listening on port: ${port}`);
    } catch (err) {
      logger.log(
        "error",
        `An error occured and stopped the connection to server: ${err}`,
        { tags: ["server", "status"] },
      );
    }
  });
})();
