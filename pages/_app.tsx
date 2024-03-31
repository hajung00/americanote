import React from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import { useLoading } from '../hooks/useLoading';
import Spinner from '../components/Spinner';

function MyApp({ Component, pageProps }: AppProps) {
  const isLoading = useLoading();

  return (
    <>
      {isLoading && <Spinner />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
