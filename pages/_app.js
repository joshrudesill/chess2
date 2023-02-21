import { store } from "../store";
import { Provider } from "react-redux";
import "../styles/globals.css";
import { useRouter } from "next/router";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <Provider store={store}>
      <div>
        <Component key={router.asPath} {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
