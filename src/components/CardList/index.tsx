import Card from '../Card';
import styles from './cardlist.module.css';
import AppContext from '../../context/context';
import { useContext } from 'react';
import { Movie } from '../../context/types';

export default function CardList() {
  const { movies } = useContext(AppContext);
  if (!movies || movies.length == 0) {
    return (
      <div className={styles.empty}>
        <h1>Movie Finder</h1>
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
