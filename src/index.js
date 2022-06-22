import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import { BrowserRouter, HashRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
      {/* We use HashRouter because of how this app is deployed in production via Spring Boot */}
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
);
