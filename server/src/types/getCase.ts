// getCases interfaces
export interface IReq {
  GetCase: string
}

export interface IRes {
  userId: number,
  id: number,
  title: string,
  body: string
}