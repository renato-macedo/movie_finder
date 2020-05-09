import Head from 'next/head';
import Link from 'next/link';
import styles from './layout.module.css';
export const siteTitle = 'Movie Finder';
export default function Layout({ children, home, clazz }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="description" content="Procure por um filme" />
        <link
          href="https://fonts.googleapis.com/css2?family=Abel&family=Lato&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Link href="/">
        <a>
          <header className={styles.header}>Movies</header>
        </a>
      </Link>
      <main className={clazz ? clazz : styles.container}>{children}</main>
    </>
  );
}
