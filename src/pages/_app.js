import '../styles/global.css';
import Provider from '../context/state';
export default function App({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}
