import Layout from '../../components/Layout';
import Info from '../../components/Info';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Movie() {
  const { query } = useRouter();
  const { id } = query;

  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      async function fetchMovie() {
        console.log({ id });
        const { data } = await axios.get(`/api/movies/${id}`);
        setMovie(data);
        setLoading(false);
      }
      fetchMovie();
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <h4>Loading</h4>
      </Layout>
    );
  }

  return <Layout>{movie ? <Info movie={movie} /> : <h3>Not Found</h3>}</Layout>;
}
