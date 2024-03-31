import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import '../styles/globals.css';
import { useLoading } from '../hooks/useLoading';
import Spinner from '../components/Spinner';

function MyApp({ Component, pageProps }: AppProps) {
  const isLoading = useLoading();

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && <Spinner />}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
