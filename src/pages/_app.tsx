import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { storeWrapper } from "@/common/redux/store";
import { Provider } from "react-redux";

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = storeWrapper.useWrappedStore(rest);
  const { pageProps } = props;
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
