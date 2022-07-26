// getTotalCases interfaces
export interface IReq {
  TotalCases: string
}

export interface IRes {
  TotalCases: number
}

export interface ICase {
  userId: number,
  id: number,
  title: string,
  body: string
}