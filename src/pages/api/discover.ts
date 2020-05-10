import { NextApiRequest, NextApiResponse } from 'next';
import { getFirstOcurrence, fetchData } from '../../helpers/api';
import {
  mapToApiPage,
  mapResults,
  APP_RESULTS_PER_PAGES,
} from '../../helpers/pagination';
import { getFindGenreURL } from '../../helpers/urls';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/json');

  let { genre, page = '1', api_total_pages } = req.query;

  if (!genre) return res.status(400).json({ error: 'missing genre id' });

  genre = getFirstOcurrence(genre);

  page = getFirstOcurrence(page);

  api_total_pages = getFirstOcurrence(api_total_pages);

  let apiPage = mapToApiPage({
    appPage: parseInt(page),
    apiResultsPerPage: 20,
    apiTotalPages: parseInt(api_total_pages),
  });

  const URL = getFindGenreURL(genre, apiPage);

  try {
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
    return res.status(500).json({ error: 'server error' });
  }
};
