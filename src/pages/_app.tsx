import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Forecast</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
        <meta name='description' content={"Forecast Application assigment"} />
        <meta
          name='og:description'
          content={"Forecast Application assigment"}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
