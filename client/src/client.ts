import * as grpc from '@grpc/grpc-js';
import { ServiceClient } from '@grpc/grpc-js/build/src/make-client';
import * as protoLoader from '@grpc/proto-loader';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { IGetCaseResponse, IGetTotalCasesResponse } from 'types/client';
import logger from './logs/logger';

// Data
const PROTO_FILE = process.env['PROTO_FILE'] || '../protos/case.proto';
const HOST = process.env['HOST'] || 'localhost:3000';

// Loading the proto file
const packageDefinition = protoLoader.loadSync(PROTO_FILE); // "../server/src/protos/case.proto"

// Preparing the package
const casesPackage: any = grpc.loadPackageDefinition(packageDefinition)['cases'];

// Credentials
const credentials = grpc.credentials.createSsl(
    fs.readFileSync(path.join("/home/bastos/Projetos/gRPC/gRPC_2/ssl/rootCA.crt")),
);

// Service TotalCasesService
const TotalCasesService: ServiceClient = new casesPackage.TotalCasesService(
    HOST,
    credentials
);

// Requesting total cases
TotalCasesService['GetTotalCases']({ TotalCases: "get total cases" }, (err: Error, response: IGetTotalCasesResponse) => {
    if (response !== undefined) {
        logger.log('info', JSON.stringify(response, null, "\t"))
    }
    else {
        logger.log('error', JSON.stringify(err, null, "\t"),)
    }
});

// // Requesting a especific case
TotalCasesService['GetCase']({ GetCase: "34" }, (err: Error, response: IGetCaseResponse) => {
    if (response !== undefined) {
        logger.log('info', JSON.stringify(response, null, "\t"))
    } else {
        logger.log('error', JSON.stringify(err, null, "\t"))
    }
});

// Requesting health
TotalCasesService['HealthCheck']({ HealthCheck: "health" }, (err: Error, response: IGetCaseResponse) => {
    if (response !== undefined) {
        logger.log('info', JSON.stringify(response, null, "\t"))
    } else {
        logger.log('error', JSON.stringify(err, null, "\t"))
    }
});
