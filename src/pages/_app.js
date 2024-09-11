// src/pages/_app.js

import '../styles/index.css'; // 전역 CSS 파일

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;