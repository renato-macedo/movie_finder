import axios from 'axios';

// only use the first occurrence of the query param
export function getFirstOcurrence(str: string | string[]): string {
  return Array.isArray(str) ? str[0] : str;
}

export async function fetchData(URL: string) {
  const { data } = await axios.get(URL);
  return data;
  // const { results, total_pages, total_results } = data;
  // return { results, total_pages, total_results };
}
