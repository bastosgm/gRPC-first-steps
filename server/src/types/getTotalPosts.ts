// getTotalPosts interfaces
export interface IReq {
  TotalPosts: string;
}

export interface IRes {
  TotalPosts: number;
}

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}
