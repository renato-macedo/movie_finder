import Card from '../Card';
import styles from './cardlist.module.css';
import AppContext from '../../context/context';
import { useContext } from 'react';

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
      {movies.map((movie) => (
        <li key={movie.id}>
          <Card info={movie.title} />
        </li>
      ))}
    </ul>
  );
}
