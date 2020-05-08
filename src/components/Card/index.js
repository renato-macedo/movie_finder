import styles from './card.module.css';
import { GENRES, IMAGE_URL } from './constants';
import Link from 'next/link';
const a = 2;

export default function Card({ movie }) {
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
      <div className={styles.image}>
        <img src={image ? image : '/images/notfound.jpg'} alt={title} />
      </div>
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
            {/* <li className={styles.pill}>Ação</li>
            <li className={styles.pill}>Aventura</li>
            <li className={styles.pill}>Fantasia</li> */}
          </ul>
        </footer>
      </div>
    </div>
  );
}

function Text({ text }) {
  let className = styles.font;
  if (text.length > 14) {
    className = styles.small_font;
  }
  return <div className={className}>{text}</div>;
}
