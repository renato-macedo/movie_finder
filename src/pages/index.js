import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
// import utilStyles from '../styles/utils.module.css';
import Searchbar from '../components/Searchbar';
import Footer from '../components/Footer';
import CardList from '../components/CardList';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Searchbar />
      <CardList />
      <Footer />
    </Layout>
  );
}
