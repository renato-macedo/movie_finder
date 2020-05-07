import { useContext } from 'react';

import styles from './footer.module.css';

import AppContext from '../../context/context';

export default function Footer() {
  const { total_pages, currentPage, setCurrentPage } = useContext(AppContext);

  function selectPage(p) {
    setCurrentPage(p);
    window.scrollTo(0, 0);
  }

  if (total_pages > 0) {
    const pages = calculateRange(currentPage, total_pages);
    return (
      <footer className={styles.footer}>
        <ul className={styles.list}>
          {pages.map((p) =>
            p == currentPage ? (
              <li className={styles.item} key={p}>
                <div className="circle">
                  <div className="inner-circle">{p}</div>
                </div>
              </li>
            ) : (
              <li
                className={styles.page_number}
                key={p}
                onClick={() => selectPage(p)}
              >
                {p}
              </li>
            )
          )}
        </ul>
      </footer>
    );
  }

  return <footer className={styles.footer}></footer>;
}

function calculateRange(currentPage, limit) {
  if (limit <= 5) {
    let range = [];
    for (let i = 1; i <= limit; i++) {
      range.push(i);
    }

    return range;
  }
  if (currentPage <= 3) {
    return [1, 2, 3, 4, 5];
  }

  if (currentPage >= limit - 2) {
    return [limit - 4, limit - 3, limit - 2, limit - 1, limit];
  }

  return [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ];
}
