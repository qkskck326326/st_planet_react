// src/pages/_app.js

import '../styles/index.css'; // 전역 CSS 파일
import { GlobalStateProvider } from '../context/GlobalStateProvider';

function MyApp({ Component, pageProps }) {
  return (
      <GlobalStateProvider>
        <Component {...pageProps} />
      </GlobalStateProvider>
  );
}

export default MyApp;
