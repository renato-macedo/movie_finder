import Card from '../Card';
import AppContext from '../../context/context';
import { useContext } from 'react';
const cards = [
  { id: 1, info: 'oi' },
  { id: 2, info: 'olá' },
];

export default function CardList() {
  const { movies } = useContext(AppContext);
  if (!movies || movies.length == 0) {
    return <h1>vish</h1>;
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
