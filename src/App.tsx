import React from 'react';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { GlobalStyle } from './styles/global';
import { inject } from '@vercel/analytics';
import { Footer } from './components/Footer/Footer';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  inject();
  return (
    <>
      <GlobalStyle />
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;