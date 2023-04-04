import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Statecontext  from './context/Statecontext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Statecontext>
    <App />
    </Statecontext>
  </React.StrictMode>
);

