// import grpc from '@grpc/grpc-js';

export interface IReq {
  Health: any
  HealthCheck: string
}

export interface IRes {
  status: string
  grpcCode: string
  processTime: string
  timestamp: string
}