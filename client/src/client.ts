import * as grpc from "@grpc/grpc-js";
import { ServiceClient } from "@grpc/grpc-js/build/src/make-client";
import * as protoLoader from "@grpc/proto-loader";
import "dotenv/config";
import fs from "fs";
import path from "path";

// Data
const PROTO_FILE = process.env["PROTO_FILE"] || "../protos/case.proto";
const HOST = process.env["HOST"] || "localhost:3000";

// Loading the proto file
const packageDefinition = protoLoader.loadSync(PROTO_FILE);

// Preparing the package
const casesPackage: any =
  grpc.loadPackageDefinition(packageDefinition)["cases"];

// Credentials
const credentials = grpc.credentials.createSsl(
  fs.readFileSync(
    path.join("/home/bastosgm/projects/grpc/gRPC-first-steps/ssl/rootCA.crt"),
  ),
);

// Service TotalCasesService
const TotalCasesService: ServiceClient = new casesPackage.TotalCasesService(
  HOST,
  credentials,
);

export default TotalCasesService;
