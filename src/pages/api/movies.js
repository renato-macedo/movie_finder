import axios from 'axios';

const API_KEY = '1bdce766d954223068eacafe6c05c383';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

export default async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  let { search, page } = req.query;

  try {
    if (search) {
      if (!page) {
        page = 1;
      }
      const { data } = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${search}&include_adult=true&page=${page}`
      );
      const { results, total_pages } = data;
      // const results = [
      //   { title: 'aaaa', id: 2 },
      //   { title: 'bbbbbbb', id: 3 },
      //   { title: 'cccccccc', id: 4 },
      // ];
      // const total_pages = 7;
      res.statusCode = 200;
      return res.end(JSON.stringify({ results, total_pages }));
    }

    res.statusCode = 400;
    return res.end(JSON.stringify({ error: 'missing search text' }));
  } catch (error) {
    return res.end(JSON.stringify({ error: 'server error' }));
  }
};
