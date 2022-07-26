//Types
export interface IGetTotalCasesResponse {
  TotalCases: number
}

export interface IGetCaseResponse {
  userId: number,
  id: number,
  title: string,
  body: string
}