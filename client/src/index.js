import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Setup from './boot/setup';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Setup />, document.getElementById('root'));

serviceWorker.unregister();
