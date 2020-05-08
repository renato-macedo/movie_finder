import axios from 'axios';

const API_KEY = '1bdce766d954223068eacafe6c05c383';
const BASE_URL = 'https://api.themoviedb.org/3';

const RESULTS_PER_PAGES = 5;

function memoCalculate() {
  const memo = { 1: 1, 2: 2, 3: 3, 4: 4 };
  function calculatePage(p) {
    const index = memo[p];
    if (index) {
      return index;
    }
    const newValue = calculatePage(p - 4);
    memo[p] = newValue;
    return newValue;
  }
  return { calculatePage };
}
const { calculatePage } = memoCalculate();

export default async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  let { q, page = 1, api_total_pages } = req.query;

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

function mapToApiPage(page, apiResultsPerPage, apiTotalPages) {
  const totalResults = apiResultsPerPage * apiTotalPages;

  const appTotalPages = totalResults / 5;

  const pages = [];
  for (let i = 1; i <= appTotalPages; i++) {
    pages.push(i);
  }

  let p = new Array(parseInt(apiTotalPages, 10));

  for (let i = 0; i < p.length; i++) {
    let r = [];

    while (r.length < apiResultsPerPage / 5) {
      let result = pages.shift();

      r.push(result);
    }
    if (r.includes(parseInt(page, 10))) {
      return i + 1; // api page number
    }
    // p[i] = r;
  }

  // for (let i = 0; i < p.length; i++) {
  //   if (p[i].includes()) {
  //     return i;
  //   }
  // }

  throw new Error('nao deu');
}

function groupResults(results, resultsPerPage) {
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

async function getData(q, page, apitotalPages) {
  let actualPage = '1';

  if (page !== actualPage && apitotalPages) {
    actualPage = mapToApiPage(page, 20, apitotalPages);
  }

  const { data } = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${q}&page=${actualPage}&language=pt-BR`
  );

  // results per page is always 20
  const { results, total_pages, total_results } = data;

  const appTotalPages = Math.ceil(total_results / 5);

  const newResults = groupResults(results, 5);
  page = calculatePage(page) - 1;

  return {
    results: newResults[page],
    api_total_pages: total_pages, // remember total pages for mapping in the next requests
    app_total_pages: appTotalPages, // used for app pagination
  };
}
