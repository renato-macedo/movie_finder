import styles from './card.module.css';

export default function Card({ info }) {
  return <div className={styles.card}>{info}</div>;
}
