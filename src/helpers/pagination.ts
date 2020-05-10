export const APP_RESULTS_PER_PAGES = 5;
export const API_RESULTS_PER_PAGE = 20;

/*
Functions below are used for mapping 
the api pagination (20 results per page) 
to app pagination (5 results per page)

Probably this is not best solution
*/
export function mapToApiPage({
  appPage,
  apiResultsPerPage,
  apiTotalPages,
}: {
  appPage: number;
  apiResultsPerPage: number;
  apiTotalPages: number;
}): string {
  let apiPage = 1;

  if (appPage == apiPage) {
    return '1';
  }
  const totalResults = apiTotalPages * apiResultsPerPage;

  const appTotalPages = totalResults / APP_RESULTS_PER_PAGES;

  const pages = [];
  for (let i = 1; i <= appTotalPages; i++) {
    pages.push(i);
  }

  let p = new Array(apiTotalPages);

  for (let i = 0; i < p.length; i++) {
    let r = [];

    while (r.length < apiResultsPerPage / APP_RESULTS_PER_PAGES) {
      let result = pages.shift();

      r.push(result);
    }
    if (r.includes(appPage)) {
      apiPage = i + 1;

      return apiPage.toString();
    }
  }

  throw new Error('Invalid app Page');
}

export function groupResults(
  results: unknown[],
  resultsPerPage: number
): unknown[] {
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

// just to prevent to much processing
function memoizeFunction() {
  console.log('ALOU');
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

export const calculatePagesRange = memoizeFunction();

export function mapResults(results: unknown[], appPage: number) {
  const groupedResults = groupResults(results, APP_RESULTS_PER_PAGES);
  const pageInRange = calculatePagesRange(appPage) - 1;

  return groupedResults[pageInRange];
}
