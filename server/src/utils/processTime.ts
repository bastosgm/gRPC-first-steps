import { fetchCases } from './fetchData';

export const processTime = async () => {
  const start = process.hrtime.bigint()
  await fetchCases()
  const end = process.hrtime.bigint()
  return Number(end - start)
}