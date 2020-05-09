import styles from './detail.module.css';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w400';

export default function Detail({ movie }) {
  const {
    poster_path,
    title,
    popularity,
    overview,
    release_date,
    original_language,
    genres,
    status,
    revenue,
    budget,
    videos,
  } = movie;
  const image = poster_path ? `${IMAGE_URL}${poster_path}` : '';
  return (
    <div className={styles.info}>
      <header>
        <div title={title}>{title}</div>
        <div className={styles.release} title={release_date}>
          {release_date}
        </div>
      </header>
      <div className={styles.body}>
        <div className={styles.left}>
          <section>
            <div title="Sinopse" className={styles.sub}>
              Sinopse
            </div>
            <div className={styles.overview}>{overview}</div>
          </section>
          <section>
            <div title="Informações" className={styles.sub}>
              Informações
            </div>
            <ul className={styles.attribs}>
              <li className={styles.prop}>
                <p title="Situação">Situação</p>
                <p title={status == 'Released' ? 'Lançado' : status}>
                  {status == 'Released' ? 'Lançado' : status}
                </p>
              </li>
              <li className={styles.prop}>
                <p title="Idioma">Idioma</p>
                <p title={original_language}>{original_language}</p>
              </li>
              <li className={styles.prop}>
                <p title="Duração">Duração</p>
                <p>2h10min</p>
              </li>
              <li className={styles.prop}>
                <p title="Orçamento">Orçamento</p>
                <p title={budget}>{`$ ${budget}`}</p>
              </li>
              <li className={styles.prop}>
                <p title="Receita">Receita</p>
                <p title={revenue}>{`$ ${revenue}`}</p>
              </li>
              {/* <li className={styles.prop}>
                <p>Lucro</p>
                <p></p>
              </li> */}
            </ul>
          </section>
          <footer>
            <div>
              <ul className={styles.pill_list}>
                {genres.map(({ id, name }) => (
                  <li title={name} key={id} className={styles.pill}>
                    {name}
                  </li>
                ))}
              </ul>
            </div>
            <div title="Popularidade" className={styles.circle}>
              <div className="circle">
                <div className="inner-circle">
                  {popularity.toFixed(0) + '%'}{' '}
                </div>
              </div>
            </div>
          </footer>
        </div>
        <div className={styles.image}>
          <img
            title={`${title} Poster`}
            src={image ? image : '/images/notfound.jpg'}
            alt={`${title} poster`}
          />
        </div>
      </div>
      {videos.results.length > 0 && (
        <div className={styles.vid}>
          <ul>
            {videos.results.map((vid) => (
              <li key={vid.id}>
                <iframe
                  src={`https://www.youtube.com/embed/${vid.key}`}
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
