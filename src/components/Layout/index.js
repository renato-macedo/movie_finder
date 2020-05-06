import Head from 'next/head';
import styles from './layout.module.css';
// import utilStyles from '../styles/utils.module.css';
// import Link from 'next/link';

// const name = 'Renato Macêdo';
export const siteTitle = 'Movie Finder';
export default function Layout({ children, home }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>Movies</header>
      <main className={styles.container}>{children}</main>
    </>
  );
}
