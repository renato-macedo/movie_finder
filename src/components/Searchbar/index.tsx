import {
  useState,
  useContext,
  ChangeEventHandler,
  ChangeEvent,
  FormEvent,
} from 'react';

import styles from './searchbar.module.css';
import AppContext from '../../context/context';

export default function Searchbar() {
  const [text, setText] = useState('');
  const { searchMovies, clear } = useContext(AppContext);

  function handleChange(e: FormEvent<HTMLInputElement>) {
    if (!e.currentTarget.value) {
      clear();
    }
    const text = e.currentTarget.value ? e.currentTarget.value : '';
    setText(text);
  }
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (text) {
      searchMovies(text);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        className={styles.input}
        placeholder="Search"
        type="text"
        value={text}
        onChange={handleChange}
      />
      <button className={styles.btn} type="submit">
        <img src="/images/search-icon.png" alt="search" />
      </button>
    </form>
  );
}
