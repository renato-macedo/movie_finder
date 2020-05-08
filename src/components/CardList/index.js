import Card from '../Card';
import styles from './cardlist.module.css';
import AppContext from '../../context/context';
import { useContext } from 'react';

// const movie = JSON.parse(
//   '{"popularity":50.237,"vote_count":13709,"video":false,"poster_path":"/bLpIFiuWF1bKnBqi7LqnJcLHtN.jpg","id":284053,"adult":false,"backdrop_path":"/kaIfm5ryEOwYg8mLbq8HkPuM1Fo.jpg","original_language":"en","original_title":"Thor: Ragnarok","genre_ids":[28,12,35,14],"title":"Thor: Ragnarok","vote_average":7.6,"overview":"Thor está preso do outro lado do universo. Ele precisa correr contra o tempo para voltar a Asgard e parar Ragnarok, a destruição de seu mundo, que está nas mãos da poderosa e implacável vilã Hela.","release_date":"2017-10-25"}'
// );
// const movies = [
//   movie,
//   { ...movie, id: 1 },
//   { ...movie, id: 2 },
//   { ...movie, id: 3 },
// ];

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
    <ul className={styles.cardlist}>
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
