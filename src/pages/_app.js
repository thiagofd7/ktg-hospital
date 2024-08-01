import React, { useEffect } from 'react';
import Head from 'next/head';
import '../assets/styles/globals.css'; 
import { PlanProvider } from '../context/PlanContext';
import { ThemeProvider } from '../context/ThemeContext'; // Importe o ThemeProvider
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    fetch('/api/socket').catch((err) => console.error('Failed to initialize Socket.io:', err));
  }, []);

  return (
    <>
      <Head>
        <title>KTG - Gerenciamento de Planos de Saúde Simplificado</title>
        <meta name="description" content="Gerenciamento de planos de saúde" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/hospital.ico" />
      </Head>
      <ThemeProvider> {/* Envolva a aplicação com o ThemeProvider */}
        <PlanProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </PlanProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
