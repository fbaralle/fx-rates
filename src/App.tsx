import FXRates from "./FX-Rates";
import Layout from "./FX-Rates/components/Layout";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import reducer from './store';
import thunk from 'redux-thunk';

const store = createStore(reducer ,applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <Layout>
        <FXRates />
      </Layout>
    </Provider>
  );
};

export default App;
