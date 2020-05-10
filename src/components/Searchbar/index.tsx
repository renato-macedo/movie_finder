import {
  useState,
  useContext,
  ChangeEventHandler,
  ChangeEvent,
  FormEvent,
} from 'react';

import styles from './searchbar.module.css';
import AppContext from '../../context/context';
import { getGenreID } from './genres';

export default function Searchbar() {
  const [text, setText] = useState('');
  //const [searchType, setSearchType] = useState('filme');
  const {
    searchMovies,
    clear,
    searchByGenre,
    searchType,
    setSearchType,
  } = useContext(AppContext);

  function handleChange(e: FormEvent<HTMLInputElement>) {
    if (!e.currentTarget.value) {
      clear();
    }
    const text = e.currentTarget.value ? e.currentTarget.value : '';

    setText(text);
  }

  function changeSearchType(type: string) {
    setSearchType(type);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (text) {
      if (searchType == 'genero') {
        let genreID = getGenreID(text.toLowerCase());
        if (genreID) {
          searchByGenre(genreID, text);
        } else {
          alert('Gênero inválido');
        }
      } else {
        searchMovies(text);
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.container}>
        <div className={styles.searchbar}>
          <input
            className={styles.input}
            id="search"
            placeholder="Buscar"
            type="text"
            value={text}
            onChange={handleChange}
          />
          <Dropdown onChange={changeSearchType} />

          <button className={styles.btn} type="submit">
            <img src="/images/search-icon.png" alt="search" />
          </button>
        </div>
      </form>
    </>
  );
}

function Dropdown({ onChange }: { onChange: (selected: string) => void }) {
  const { searchType } = useContext(AppContext);
  const [closed, setClosed] = useState(true);

  function selectAndClose(type: string) {
    close();
    onChange(type);
  }
  function open() {
    setClosed(false);
  }

  function close() {
    setClosed(true);
  }

  return (
    <div className={styles.dropdown}>
      <div className={styles.selected} onClick={open}>
        Buscar por
        <p>{searchType == 'genero' ? 'Gênero' : 'Filme'}</p>
      </div>

      {!closed && (
        <ul className={styles.options_container}>
          <li className={styles.option} onClick={() => selectAndClose('filme')}>
            Filme
          </li>
          <li
            className={styles.option}
            onClick={() => selectAndClose('genero')}
          >
            Gênero
          </li>
        </ul>
      )}
    </div>
  );
}
