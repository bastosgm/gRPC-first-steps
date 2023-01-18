import * as grpc from "@grpc/grpc-js";
import { ServiceClient } from "@grpc/grpc-js/build/src/make-client";
import * as protoLoader from "@grpc/proto-loader";
import "dotenv/config";
import fs from "fs";
import path from "path";

// Data
const PROTO_FILE = process.env["PROTO_FILE"]!;
const HOST = process.env["HOST"]!;

// Loading the proto file
const packageDefinition = protoLoader.loadSync(PROTO_FILE);

// Preparing the package (optional)
const postsPackage: any =
  grpc.loadPackageDefinition(packageDefinition)["posts"];

// Credentials
// const credentials = grpc.credentials.createInsecure();
const credentials = grpc.credentials.createSsl(
  fs.readFileSync(path.join(__dirname, "../../ssl/rootCA.crt")),
);

// Service TotalPostsService
const TotalPostsService: ServiceClient = new postsPackage.TotalPostsService(
  HOST,
  credentials,
);

export default TotalPostsService;
