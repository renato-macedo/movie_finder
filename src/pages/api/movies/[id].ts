import axios from 'axios';

import { NextApiRequest, NextApiResponse } from 'next';

const API_KEY = '1bdce766d954223068eacafe6c05c383';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Content-Type', 'application/json');

  const { id } = req.query;

  if (id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=pt-BR&append_to_response=videos`;
    const { data } = await axios.get(url);

    res.statusCode = 200;
    return res.end(JSON.stringify(data));
  }

  res.statusCode = 400;
  return res.end(JSON.stringify({ error: 'missing movie id' }));
};
