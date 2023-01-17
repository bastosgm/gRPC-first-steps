import { fetchPosts } from "./fetchData";

export const processTime = async () => {
  const start = process.hrtime.bigint();
  await fetchPosts();
  const end = process.hrtime.bigint();
  return Number(end - start);
};
