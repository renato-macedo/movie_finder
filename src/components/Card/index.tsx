import styles from './card.module.css';
import { GENRES, IMAGE_URL } from './constants';
import Link from 'next/link';
import { Movie } from '../../context/types';

export default function Card({ movie }: { movie: Movie }) {
  const {
    poster_path,
    title,
    popularity,
    overview,
    release_date,
    genre_ids,
    id,
  } = movie;

  const image = poster_path ? `${IMAGE_URL}${poster_path}` : '';

  return (
    <div className={styles.card}>
      {image && (
        <div className={styles.image}>
          <img src={image} alt={`${title} poster`} />
        </div>
      )}
      <div className={styles.info}>
        <header>
          <div className={styles.circle}>
            <div className="circle">
              <div className="inner-circle">{popularity.toFixed(0) + '%'} </div>
            </div>
          </div>
          <div className={styles.title_container}>
            <Link href="/movies/[id]" as={`/movies/${id}`}>
              <a>
                <Text text={title} />
              </a>
            </Link>
            <div className={styles.release}>{release_date}</div>
          </div>
        </header>
        <section>{overview}</section>
        <footer>
          <ul className={styles.pill_list}>
            {genre_ids.map((id) => (
              <li key={id} className={styles.pill}>
                {GENRES[id]}
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </div>
  );
}

function Text({ text }: { text: string }) {
  let className = styles.font;
  if (text.length > 14) {
    className = styles.small_font;
  }
  return <div className={className}>{text}</div>;
}
