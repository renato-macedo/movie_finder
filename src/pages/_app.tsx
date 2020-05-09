import '../styles/global.css';
import Provider from '../context/state';
import { ReactComponentElement, Component } from 'react';

import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}
