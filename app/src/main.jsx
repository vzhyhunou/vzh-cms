import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import App from './App';
import context from './context';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter basename={context.basename}>
        <App/>
    </BrowserRouter>
);