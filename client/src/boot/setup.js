import React from 'react';
import { Provider } from 'react-redux';
import { initSocket } from '../api/ws/socketController';
import configureStore from './configureStore';
import App from '../App';

const Setup = () => {

  const store = initSocket(configureStore());


    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
}

export default Setup;