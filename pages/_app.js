import { store } from "../store";
import { Provider } from "react-redux";
import "../styles/globals.css";
import { useRouter } from "next/router";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <Provider store={store}>
      <Head>
        <title>Chess2</title>
        <link rel='icon' href='favicon.svg'></link>
      </Head>
      <div>
        <Component key={router.asPath} {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
