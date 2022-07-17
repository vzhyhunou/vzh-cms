import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserHistory} from 'history';

import App from './App';

ReactDOM.createRoot(document.getElementById('react')).render(<App history={createBrowserHistory()}/>);
