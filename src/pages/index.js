import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
// import utilStyles from '../styles/utils.module.css';
import Searchbar from '../components/Searchbar';
import Footer from '../components/Footer';
import CardList from '../components/CardList';
import { useState } from 'react';
import Provider from '../context/state';

export default function Home() {
  const [movies, setMovies] = useState([]);

  return (
    <Provider>
      <Layout>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <Searchbar />
        <CardList />
        <Footer />
      </Layout>
    </Provider>
  );
}

// export async function getStaticProps()
