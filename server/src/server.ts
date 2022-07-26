// Libs
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import getTotalCases from './services/getTotalCases';
import getCase from './services/getCase';
import healthCheck from './services/healthCheck';
import 'dotenv/config';
import * as fs from 'fs';
import * as path from 'path';
import createLogger from './utils/logger/logger';

const logger = createLogger(__filename);

// Data
const PROTO_FILE = process.env['PROTO_FILE'] || '../protos/case.proto';
const HOST = process.env['HOST'] || 'localhost:3000';

// Main
(async function main() {
    const server = new grpc.Server();

    // Loading the proto file
    const proto = protoLoader.loadSync(PROTO_FILE);

    // Defining the package (cases)
    const { cases }: any = grpc.loadPackageDefinition(proto);

    // Adding service. Both key and value need to have the same structure.
    server.addService(cases.TotalCasesService.service, {
        GetTotalCases: getTotalCases,
        GetCase: getCase,
        HealthCheck: healthCheck,
    });

    // keyPairs
    const keyPairs: grpc.KeyCertPair[] = [
        {
            cert_chain: fs.readFileSync(path.join("/home/bastos/Projetos/gRPC/gRPC_2/ssl/server.crt")),
            private_key: fs.readFileSync(path.join("/home/bastos/Projetos/gRPC/gRPC_2/ssl/server.key"))
        }
    ]

    // Credentials
    // const credentials = grpc.ServerCredentials.createInsecure();
    const credentials = grpc.ServerCredentials.createSsl(
        fs.readFileSync(path.join("/home/bastos/Projetos/gRPC/gRPC_2/ssl/rootCA.crt")),
        keyPairs,
        false
    )

    // Server
    server.bindAsync(
        HOST, credentials,
        (_err, port) => {
            try {
                server.start();
                logger.log('info', `Listening on port: ${port}`)
            } catch (err) {
                logger.log('error', `An error occured and stopped the connection to server: ${err}`, { tags: ['server', 'status'] })
            }
        }
    );

})();