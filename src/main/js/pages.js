'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Helmet} from 'react-helmet';
import {Layout} from './commons';

const Main = () => (
    <main role="main" className="container">
        <Helmet>
            <title>Page</title>
        </Helmet>
    </main>
);

ReactDOM.render(
    <Layout Main={Main}/>,
    document.getElementById('react')
);
