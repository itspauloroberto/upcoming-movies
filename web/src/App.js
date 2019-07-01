import React from 'react';
import { Provider } from 'react-redux';
import ConfigureStore from './ConfigureStore';
import Main from './Main';
import './App.css';

const store = ConfigureStore();

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
