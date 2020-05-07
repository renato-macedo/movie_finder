import styles from './card.module.css';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w400';
const a = 2;

export default function Card({ movie }) {
  const { poster_path, title, popularity, overview, release_date } = movie;

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
            <a href="/">
              <Text text={title} />
            </a>
            <div className={styles.release}>{release_date}</div>
          </div>
        </header>
        <section>{overview}</section>
        <footer>
          <ul className={styles.pill_list}>
            <li className={styles.pill}>Ação</li>
            <li className={styles.pill}>Aventura</li>
            <li className={styles.pill}>Fantasia</li>
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
  return (
    <div className={className} style={{ lineHeight: '16px' }}>
      {text}
    </div>
  );
}
