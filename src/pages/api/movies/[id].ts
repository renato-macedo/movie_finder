import { NextApiRequest, NextApiResponse } from 'next';
import { getMovieURL } from '../../../helpers/urls';
import { getFirstOcurrence, fetchData } from '../../../helpers/api';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let { id } = req.query;

  if (!id) return res.status(400).json({ error: 'missing movie id' });

  id = getFirstOcurrence(id);
  const URL = getMovieURL(id);

  try {
    const data = await fetchData(URL);
    if (data) {
      return res.json(data);
    }

    return res.status(404).json({ error: 'Filme não encontrado' });
  } catch (error) {
    return res.status(500).json({ error: 'server error' });
  }
};
