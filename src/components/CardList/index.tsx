import Card from '../Card';
import styles from './cardlist.module.css';
import AppContext from '../../context/context';
import { useContext } from 'react';

export default function CardList() {
  const { movies, error } = useContext(AppContext);
  if (!movies || movies.length == 0) {
    return (
      <div className={styles.empty}>
        <h1>{error ? error : 'Movie Finder'}</h1>
      </div>
    );
  }

  return (
    <ul>
      {movies.map(
        (movie) =>
          movie && (
            <li key={movie.id}>
              <Card movie={movie} />
            </li>
          )
      )}
    </ul>
  );
}
