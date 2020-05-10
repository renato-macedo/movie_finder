import Layout from '../../components/Layout';
import Detail from '../../components/Detail';
import Loading from '../../components/Loading';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Head from 'next/head';

import styles from '../../components/Detail/detail.module.css';
import { MovieDetail } from '../../context/types';

export default function Movie() {
  const { query } = useRouter();
  const { id } = query;

  const [movie, setMovie] = useState<MovieDetail>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/movies/${id}`)
        .then(({ data }: AxiosResponse<MovieDetail>) => {
          setMovie(data);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <Layout clazz={styles.container}>
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout clazz={styles.container}>
      <Head>
        <title>{movie ? movie.title : ''}</title>
      </Head>
      {movie ? <Detail movie={movie} /> : <h3>Not Found</h3>}
    </Layout>
  );
}
