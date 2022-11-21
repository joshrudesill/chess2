import { store } from "../store";
import { Provider } from "react-redux";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <div className='bg-neutral-800'>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default MyApp;
