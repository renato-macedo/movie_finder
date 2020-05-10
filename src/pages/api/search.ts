import { NextApiRequest, NextApiResponse } from 'next';

import { getFirstOcurrence, fetchData } from '../../helpers/api';
import {
  mapToApiPage,
  APP_RESULTS_PER_PAGES,
  API_RESULTS_PER_PAGE,
  mapResults,
} from '../../helpers/pagination';
import { getSearchURL } from '../../helpers/urls';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let { q: query, page = '1', api_total_pages } = req.query;

  if (!query) return res.status(400).json({ error: 'missing search text' });

  query = getFirstOcurrence(query);

  page = getFirstOcurrence(page);

  api_total_pages = getFirstOcurrence(api_total_pages);

  try {
    const apiPage = mapToApiPage({
      appPage: parseInt(page),
      apiResultsPerPage: API_RESULTS_PER_PAGE,
      apiTotalPages: parseInt(api_total_pages),
    });

    const URL = getSearchURL(query, apiPage);

    let { results, total_pages, total_results } = await fetchData(URL);

    if (results.length < 1)
      return res.status(404).json({ error: 'Nenhum filme encontrado.' });

    const appTotalPages = Math.ceil(total_results / APP_RESULTS_PER_PAGES);

    const newResults = mapResults(results, parseInt(page));

    return res.json({
      results: newResults,
      api_total_pages: total_pages, // remember total pages for mapping in the next requests
      app_total_pages: appTotalPages, // used for app pagination
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'server error' });
  }
};
