import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { Movie } from '../../context/types';

const API_KEY = '1bdce766d954223068eacafe6c05c383';
const BASE_URL = 'https://api.themoviedb.org/3';

const RESULTS_PER_PAGES = 5;

// just to prevent to much processing
function memoizeFunction() {
  const memo: { [key: number]: number } = { 1: 1, 2: 2, 3: 3, 4: 4 };
  /* 
  f(1) = 1
  f(2) = 2
  f(3) = 3
  f(4) = 4
  f(5) = 1
  f(6) = 2
  ...
  f(32) = 1 
  */
  function calculatePagesRange(page: number): number {
    const index = memo[page];
    if (index) {
      return index;
    }
    const newValue = calculatePagesRange(page - 4);
    memo[page] = newValue;
    return newValue;
  }
  return calculatePagesRange;
}
const calculatePagesRange = memoizeFunction();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/json');

  let { q, page = '1', api_total_pages } = req.query;

  q = checkType(q);

  page = checkType(page);

  api_total_pages = checkType(api_total_pages);

  try {
    if (q) {
      const data = await getData(q, page, api_total_pages);

      res.statusCode = 200;
      return res.end(JSON.stringify(data));
    }

    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'missing search text' }));
  } catch (error) {
    console.log(error);
    return res.end(JSON.stringify({ error: 'server error' }));
  }
};

async function getData(q: string, page: string, apitotalPages: string) {
  let actualPage = '1';

  if (page !== actualPage && apitotalPages) {
    actualPage = mapToApiPage(
      parseInt(page, 10),
      20,
      parseInt(apitotalPages, 10)
    );
  }

  const { data } = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${q}&page=${actualPage}&language=pt-BR`
  );

  // results per page is always 20
  const { results, total_pages, total_results } = data;

  const appTotalPages = Math.ceil(total_results / RESULTS_PER_PAGES);

  const groupedResults = groupResults(results, RESULTS_PER_PAGES);
  const pageInRange = calculatePagesRange(parseInt(page, 10)) - 1;

  return {
    results: groupedResults[pageInRange],
    api_total_pages: total_pages, // remember total pages for mapping in the next requests
    app_total_pages: appTotalPages, // used for app pagination
  };
}

/*
Functions below are used for mapping 
the api pagination (20 results per page) 
to app pagination (5 results per page)

Probably this is not best solution
*/

function mapToApiPage(
  page: number,
  apiResultsPerPage: number,
  apiTotalPages: number
): string {
  const totalResults = apiTotalPages * apiResultsPerPage;

  const appTotalPages = totalResults / RESULTS_PER_PAGES;

  const pages = [];
  for (let i = 1; i <= appTotalPages; i++) {
    pages.push(i);
  }

  let p = new Array(apiTotalPages);

  for (let i = 0; i < p.length; i++) {
    let r = [];

    while (r.length < apiResultsPerPage / RESULTS_PER_PAGES) {
      let result = pages.shift();

      r.push(result);
    }
    if (r.includes(page)) {
      const apiPageNumber = i + 1;

      return apiPageNumber.toString();
    }
  }

  throw new Error('nao deu');
}

function groupResults(results: Movie[], resultsPerPage: number) {
  let len = results.length;
  if (results.length > resultsPerPage) {
    len = results.length / resultsPerPage;
  }
  const res = new Array(Math.ceil(len)); // 20 / 5

  for (let i = 0; i < res.length; i++) {
    let r = [];

    while (r.length < resultsPerPage) {
      let result = results.shift();

      r.push(result);
    }
    res[i] = r;
  }

  return res;
}

function checkType(coisa: string | string[]): string {
  return Array.isArray(coisa) ? coisa[0] : coisa;
}
