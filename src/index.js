import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App';

require('./app/app.scss');

ReactDOM.render((
  <App />
), document.getElementById('app'));

if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
  window.addEventListener('load', () => (navigator.serviceWorker.addEventListener('/service-worker.js')));
}