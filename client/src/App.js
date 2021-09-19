import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './redux/reducers/rootReducer';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar/NavBar';
import Copyright from './components/Copyright';
// import Layout from './hoc/Layout';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
  );

export default class App extends React.Component {
  render() {

    return (
        <Provider store={store}>
          {/* <Layout> */}
            <BrowserRouter>
              <NavBar />
              <AppRouter />
              <Copyright />
            </BrowserRouter>
          {/* </Layout> */}
        </Provider>
      );
  }
};