//Types
export interface IGetTotalPostsResponse {
  TotalPosts: number;
}

export interface IGetPostResponse {
  userId: number;
  id: number;
  title: string;
  body: string;
}
