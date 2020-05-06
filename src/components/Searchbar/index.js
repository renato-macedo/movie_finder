import { useState, useContext } from 'react';
import styles from './searchbar.module.css';
import AppContext from '../../context/context';
export default function Searchbar() {
  const [text, setText] = useState('');
  const { searchMovies, clear } = useContext(AppContext);

  function handleChange(e) {
    if (!e.target.value) {
      clear();
    }
    setText(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(text);
    if (text) {
      searchMovies(text);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        className={styles.input}
        placeholder="Busque um filme por nome, ano ou gênero..."
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
