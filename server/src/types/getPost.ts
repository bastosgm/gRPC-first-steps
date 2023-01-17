// getPosts interfaces
export interface IReq {
  GetPost: string;
}

export interface IRes {
  userId: number;
  id: number;
  title: string;
  body: string;
}
